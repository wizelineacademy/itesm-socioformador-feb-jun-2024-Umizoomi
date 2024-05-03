
interface CommentProps {
    comment: string;
 }
  

export default function Comment({comment} : CommentProps)  {
    return (
        <div className="rounded-lg p-4 border border-gray-200 mb-4 flex flex-col gap-3">
          <p className="text-center">{comment}</p>
          <div className="h-1.5 w-auto bg-green-800 rounded-md "></div>
        </div>
        
    );
}