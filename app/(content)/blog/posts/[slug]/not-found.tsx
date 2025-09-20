import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
       return (
               <div className="mx-auto flex w-full max-w-[850px] flex-col px-3 py-20 md:px-0">
                       <Link
                               href="/blog"
                               className="mb-5 flex flex-row items-center gap-2 text-xl font-medium text-gray-600 dark:text-gray-300/80"
                       >
                               <FaArrowLeft />
                               Back
                       </Link>

                       <h2 className="mb-4 text-2xl font-bold">Post not found</h2>
                       <p className="text-gray-600 dark:text-gray-300">
                               We couldn&apos;t find the blog post you&apos;re looking for.
                       </p>
               </div>
       );
}
