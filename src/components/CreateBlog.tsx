
// function CreateBlog() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')

//     const formData = new FormData(e.currentTarget)
//     const blogData = {
//       title: formData.get('title'),
//       description: formData.get('description'),
//       content: formData.get('content'),
//       author: formData.get('author'),
//       imageUrl: formData.get('imageUrl'),
//     }

//     try {
//       const response = await fetch('/api/blogs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(blogData),
//       })

//       if (!response.ok) {
//         throw new Error('Failed to create blog post')
//       }

//       const data = await response.json()
//       router.push(`/blog/${data.id}`)
//     } catch (err) {
//       setError('Failed to create blog post. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }



//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             name="description"
//             id="description"
//             required
//             rows={3}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="content" className="block text-sm font-medium text-gray-700">
//             Content
//           </label>
//           <textarea
//             name="content"
//             id="content"
//             required
//             rows={8}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="author" className="block text-sm font-medium text-gray-700">
//             Author
//           </label>
//           <input
//             type="text"
//             name="author"
//             id="author"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
//             Image URL (optional)
//           </label>
//           <input
//             type="url"
//             name="imageUrl"
//             id="imageUrl"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//         >
//           {isLoading ? 'Creating...' : 'Create Post'}
//         </button>
//       </form>
//     </div>
//   )
// }
