"use client"
import React, {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  CloudUpload,
  Paperclip
} from "lucide-react"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/ui/fileupload"
import {
  Input
} from "@/components/ui/input"
import {
  Textarea
} from "@/components/ui/textarea"
import {
  DatetimePicker
} from "@/components/ui/datetime-picker"
import { uploadFile } from "@/lib/tcloud"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  image: z.string(),
  title: z.string(),
  description: z.string(),
  deadline: z.coerce.date(),
  initial_value: z.number().min(0)
});

export default function CreateAuctionForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "deadline": new Date()
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const res = await fetch("https://api.smartse.tucano.app/auction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: values.image,
          title: values.title,
          details: values.description,
          deadline: values.deadline,
          bid: values.initial_value
        })
      });

      console.log(res);

      if (res.ok) {
        router.push("/");
        form.reset();
      }
      
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  React.useEffect(() => {
    (
      async () => {
        if (files && files.length > 0) {
          const formData = new FormData();
          formData.append("file", files[0]);
          const response = await uploadFile(files[0], files[0].name);
          
          form.setValue("image", response.url);
        }
      }
    )();
  }, [files]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecioar imagem</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className='text-gray-500 w-10 h-10' />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Selecione a imagem principal do seu item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome do item"

                  type=""
                  {...field} />
              </FormControl>
              <FormDescription>Nome do item em leilão</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Descreva o item a ser leiloado</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data e hora limite</FormLabel>
                  <DatetimePicker
                    {...field}
                    format={[
                      ["months", "days", "years"],
                      ["hours", "minutes", "am/pm"],
                    ]}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="initial_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor inicial</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Valor"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === "" ? "" : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>
        <Button type="submit">Criar leilão</Button>
      </form>
    </Form>
  )
}