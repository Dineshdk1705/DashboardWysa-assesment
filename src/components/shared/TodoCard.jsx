/* eslint-disable react/prop-types */
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getFormateDate } from "../../helper/helper";

const TodoCard = ({
  todo,
  handleDelete,
  handleToggleCompleted,
  isUpdating,
  setIsUpdating,
  currentTodoId,
  setCurrentTodoId,
  setTodoText,
  focusToInput,
}) => {
  return (
    <li
      key={todo.id}
      className="w-full flex items-center justify-between mb-3 text-sm px-5 py-2 border-[1px] border-gray-400 hover:bg-[#f5fbff] rounded-md"
    >
      <div className="flex items-center gap-5">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleCompleted(todo.id)}
          className="h-4 w-4"
        />
        <div>
          <h3
            className={`font-semibold ${
              todo.completed && "line-through text-red-400"
            }`}
          >
            {todo.todo}
          </h3>
          <h5 className="text-xs text-gray-500">
            {todo.created_at ? getFormateDate(todo.created_at) : "09 Jan, 2025"}
          </h5>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className={`${
            todo?.completed
              ? "cursor-not-allowed text-[#b8b8b8]"
              : "cursor-pointer hover:text-[#4AA4ED]"
          }  p-2`}
          onClick={() => {
            if (!todo.completed) {
              setIsUpdating(true);
              setCurrentTodoId(todo.id);
              setTodoText(todo.todo);
              focusToInput();
            }
          }}
        >
          <MdEdit size={18} />
        </button>
        <button
          className={`ml-2 cursor-pointer p-1 hover:text-[#4AA4ED]`}
          onClick={() => {
            handleDelete(todo.id);
            if (isUpdating && todo.id === currentTodoId) {
              setIsUpdating(false);
              setTodoText("");
            }
          }}
        >
          <RiDeleteBin6Fill size={18} />
        </button>
      </div>
    </li>
  );
};

export default TodoCard;
