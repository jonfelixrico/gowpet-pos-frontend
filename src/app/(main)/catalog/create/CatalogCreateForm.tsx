'use client'

import { fetchJson } from '@/utils/fetch-utils'
import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'

interface Payload {
  name: string
  price: number
}

export default function CatalogCreateForm() {
  const router = useRouter()

  async function handleSubmit(
    values: Payload,
    actions: FormikHelpers<Payload>
  ) {
    try {
      await fetchJson('/api/catalog/product', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // TODO implement feature where you can toggle going back to the catalog
      router.push('/catalog')
    } catch (e) {
      // TODO improve error handling
      alert(`Error! ${e}`)
    }
  }

  return (
    <Formik
      initialValues={{ name: '', price: 0 } as Payload}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <Flex direction="column" alignItems="stretch" gap="2">
            <Field name="name">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.name && !!form.touched.name}
                >
                  <FormLabel>Name</FormLabel>
                  <Input {...field} type="text" />
                </FormControl>
              )}
            </Field>

            <Field name="price">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.price && !!form.touched.price}
                >
                  <FormLabel>Unit Price</FormLabel>
                  <Input {...field} type="number" />
                </FormControl>
              )}
            </Field>

            <Button isLoading={props.isSubmitting} type="submit">
              Create
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
