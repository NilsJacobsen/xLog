import { Time } from "~/components/common/Time"
import { BlockchainIcon } from "~/components/icons/BlockchainIcon"
import { EditButton } from "~/components/site/EditButton"
import PostTag from "~/components/site/PostTag"
import { UniLink } from "~/components/ui/UniLink"
import { CSB_SCAN } from "~/lib/env"
import { ExpandedCharacter, ExpandedNote } from "~/lib/types"

export default function PostMeta({
  page,
  site,
  summary,
  translated,
}: {
  page: ExpandedNote
  site?: ExpandedCharacter
  summary?: string
  translated?: {
    "AI-generated summary": string
  }
}) {
  return (
    <div className="xlog-post-meta">
      <div className="text-zinc-400 mt-4 space-x-5 flex items-center">
        <Time isoString={page?.metadata?.content?.date_published} />
        {page.metadata?.content?.tags?.filter(
          (tag) => tag !== "post" && tag !== "page",
        ).length ? (
          <>
            <span className="xlog-post-tags space-x-1 truncate min-w-0">
              {page.metadata?.content?.tags
                ?.filter((tag) => tag !== "post" && tag !== "page")
                .map((tag) => (
                  <PostTag key={tag} tag={tag} />
                ))}
            </span>
          </>
        ) : null}
        <span className="xlog-post-views inline-flex items-center">
          <i className="icon-[mingcute--eye-line] mr-[2px]" />
          <span>{page.metadata?.content?.views}</span>
        </span>
        <UniLink
          className="xlog-post-blockchain inline-flex items-center"
          href={`${CSB_SCAN}/tx/${page.updatedTransactionHash}`}
        >
          <BlockchainIcon className="fill-zinc-500 ml-1" />
        </UniLink>
        <EditButton
          handle={site?.handle}
          noteId={page.noteId}
          isPost={page.metadata?.content?.tags?.includes("post")}
        />
      </div>
      {summary && (
        <div className="xlog-post-summary border rounded-xl mt-4 p-4 space-y-2">
          <div className="font-bold text-zinc-700 flex items-center">
            <i className="icon-[mingcute--android-2-line] mr-2 text-lg" />
            {translated?.["AI-generated summary"] || "AI-generated summary"}
          </div>
          <div className="text-zinc-500 leading-loose text-sm">{summary}</div>
        </div>
      )}
    </div>
  )
}
