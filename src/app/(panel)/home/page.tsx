import { redirect } from 'next/navigation'

export default function HomePage() {
  // TODO decide a better destination for this
  redirect('/catalog')
}
