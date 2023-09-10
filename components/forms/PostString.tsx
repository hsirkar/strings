"use client"

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormItem,
    FormField,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea";
import { usePathname, useRouter } from 'next/navigation';
import { StringValidation } from "@/lib/validations/string";
// import { updateUser } from "@/lib/actions/user.actions";

interface Props {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string,
    };
    btnTitle: string;
}

function PostString({ userId }: { userId: string }) {
    const router = useRouter();
    const { pathname } = usePathname();

    const form = useForm({
        resolver: zodResolver(StringValidation),
        defaultValues: {
            string: '',
            accountId: userId
        }
    })

    const onSubmit = () => {};

    return (
        
        <Form {...form}>
            <form
                onSubmit={e => form.handleSubmit(onSubmit)(e)}
                className="mt-10 flex flex-col justify-start gap-10">
        
                <FormField
                    control={form.control}
                    name="string"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-3 w-full'>
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea
                                    rows={15}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500">
                    Post String
                </Button>

            </form>
        </Form>
    )
}

export default PostString;