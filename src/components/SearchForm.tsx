// // import Form from "next/form";
// // import SearchFormReset from "@/components/SearchFormReset";
// // import {Search} from "lucide-react";

// // const SearchForm = ({ query }: { query?: string }) => {
// //     return (
// //         <Form action="/" scroll={false} className="search-form">
// //             <input
// //                 name="query"
// //                 defaultValue={query}
// //                 className="search-input"
// //                 placeholder="Search Startups"
// //             />

// //             <div className="flex gap-2">
// //                 {query && <SearchFormReset />}

// //                 <button type="submit" className="search-btn text-white">
// //                     <Search className="size-5" />
// //                 </button>
// //             </div>
// //         </Form>
// //     )
// // }

// // export default SearchForm

import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import {Search} from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
    return (
        <Form action="/" scroll={false} className="w-full max-w-[800px] mx-auto mb-4">
            <div className="relative w-full">
                <input
                    name="query"
                    defaultValue={query}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Advice"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                    {query && <SearchFormReset />}

                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg text-white">
                        <Search className="size-5" />
                    </button>
                </div>
            </div>
        </Form>
    )
}

export default SearchForm