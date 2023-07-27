import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
//@ts-expect-error
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useRef, useState } from 'react'
//@ts-expect-error
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Editor } from '@tinymce/tinymce-react'
import { Controller, useForm } from 'react-hook-form'
import { Editor as TinyMCEEditor } from 'tinymce'

interface IReminderAdd {
    code: string
    language: string
    text: string
}
const Component = () => {
    const { control, handleSubmit, register, setValue } = useForm<IReminderAdd>(
        {}
    )
    const codeString = `
    // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import slugify from 'slugify'
import prisma from '../../../lib/prisma'
import { IReminderAdd } from '../reminders/add'

type Data = {
    name: string
}

type postBody = IReminderAdd

const createReminder = async ({
    name,
    description,
    date,
    repeatDays,
}: IReminderAdd) => {
    const newSlug = slugify(name)
    let suffix = 0
    let formattedSlug: string

    do {
        formattedSlug = !suffix ? newSlug : 

        console.log('searching for:', formattedSlug)

        const existingSlug = await prisma.reminder.findUnique({
            where: {
                slug: formattedSlug,
            },
        })

        console.log('found', existingSlug)

        if (!existingSlug) break

        suffix++
    } while (true)

    const newEntry = await prisma.reminder.create({
        data: {
            name,
            description,
            slug: formattedSlug,
            date,
            repeatDays: repeatDays ? parseInt(repeatDays) : undefined,
        },
    })

    console.log(newEntry)
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    //   const { query } = req;

    if (req.method === 'POST') {
        // const body = JSON.parse(req.body);
        // console.log(req, query);

        console.log('REQUEST BODY:', req.body)
        const { name, description, date, repeatDays }: postBody = req.body

        // const eventTypeValue: eventType = [type] as eventType;

        const reminder = await createReminder({
            name,
            description,
            date,
            repeatDays,
        })

        return res.status(200).json({ reminder })
    } else {
        return res.status(200).json({ name: 'true' })
    }
}
`
    const editorRef = useRef<TinyMCEEditor | null>(null)
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent())
        }
    }

    const onSubmit = async (data: IReminderAdd) => {
        log()
        console.log(data)
    }

    const [code, setCode] = useState('')
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="filled-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                    variant="filled"
                    {...register('code')}
                />
                <SyntaxHighlighter language="tsx" style={atomDark}>
                    {code}
                </SyntaxHighlighter>

                <Controller
                    control={control}
                    name="language"
                    render={({ field: { onChange, value } }) => (
                        <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                        >
                            <InputLabel id="demo-simple-select-standard-label">
                                Age
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={value}
                                onChange={onChange}
                                label="Age"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'10'}>Ten</MenuItem>
                                <MenuItem value={'10'}>Twenty</MenuItem>
                                <MenuItem value={'20'}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Editor
                    id="dzx9qztotv74zawwz62jrt0c6hqmjg3fp6gjy64ihwtzkdpl"
                    apiKey="dzx9qztotv74zawwz62jrt0c6hqmjg3fp6gjy64ihwtzkdpl"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    // onChange={(e) => {
                    //     console.log(editorRef.current.getContent())
                    //     editorRef.current &&
                    //         setValue('text', editorRef.current.getContent())
                    // }}
                    onKeyDown={(e) => {
                        editorRef.current &&
                            setValue('text', editorRef.current.getContent())
                    }}
                    init={{
                        height: 100,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists',
                            'media table paste code help wordcount ',
                            'codesample',
                        ],
                        toolbar:
                            'undo redo | formatselect | styles ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help | codesample',
                        content_style:
                            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                />
                <button type="submit">Log editor content</button>
            </form>
        </>
    )
}
export default Component
