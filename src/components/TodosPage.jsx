/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { getFormateDate } from "../helper/helper";
import TodoCard from "./shared/TodoCard";
import Skeleton from "react-loading-skeleton";
import PopupModal from "./modal/PopupModal";
import WarningPopupModal from "./modal/WarningPopupModel";

const TodosPage = ({ userTodos = [], userId, todoLoading }) => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setTodos(userTodos || []);
  }, [userTodos]);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setTodoText(inputText.slice(0, 150));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    const newTodo = {
      id: uuidv4(),
      todo: todoText,
      userId: userId,
      completed: false,
      created_at: getFormateDate(),
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    toast.success("New Todo Added 🥳");
    setTodoText("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    const updatedTodo = {
      id: currentTodoId,
      todo: todoText,
      completed: false,
      userId: userId,
      created_at: getFormateDate(),
    };
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === currentTodoId ? updatedTodo : t))
    );
    toast.success("Todo Updated 🤩");
    setIsUpdating(false);
    setCurrentTodoId(null);
    setTodoText("");
  };

  const handleClearConfirm = () => {
    setIsOpenPopup(false);
    setTodos([]);
    setTodoText("");
    isUpdating && setIsUpdating(false);
  };

  const handleDelete = async (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id
          ? { ...t, isDeleted: true, deletedOn: new Date().toISOString() }
          : t
      )
    );
    toast.success("Todo Deleted 😌");
  };

  const handleToggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const focusToInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="w-full">
      <form
        className="relative mb-5 md:mb-14"
        onSubmit={isUpdating ? handleUpdate : handleAddTodo}
      >
        <input
          ref={inputRef}
          className={`w-full mb-5 text-sm p-5 border-[1px] border-gray-400 rounded-md text-gray-500 ${
            isUpdating ? "focus:outline-cyan-700" : "outline-none"
          }`}
          value={todoText}
          onChange={handleInputChange}
          placeholder="Add a new to-do..."
        />
        <p
          className={`absolute right-0 text-sm text-gray-400 ${
            todoText.length === 150 && "text-red-400"
          }`}
        >
          {todoText.length}/150
        </p>
        <button
          onClick={() => todos?.length > 0 && setIsOpenPopup(true)}
          type="button"
          className="w-15 mr-2 text-sm text-center border-[1px] hover:bg-[#f7f7f7] border-gray-400 text-gray-400 p-[2px] rounded-md"
        >
          Clear
        </button>

        <button
          type="submit"
          className="w-24 text-sm text-center border-[1px] border-[#4AA4ED] bg-[#4AA4ED] hover:border-[#4097de] hover:bg-[#4097de] text-white p-[2px] rounded-md"
        >
          {isUpdating ? "Update" : "Add To-do"}
        </button>
      </form>
      <ul className="overflow-y-scroll max-h-[480px]">
        {todoLoading ? (
          <Skeleton
            count={7}
            height={50}
            className="mb-2"
            baseColor="#E8E8E8"
            highlightColor="#FFFFFF"
          />
        ) : todos.filter((t) => !t.isDeleted).length > 0 ? (
          todos
            .filter((t) => !t.isDeleted)
            .map((todo) => {
              if (!todo.isDeleted) {
                return (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    handleDelete={handleDelete}
                    handleToggleCompleted={handleToggleCompleted}
                    isUpdating={isUpdating}
                    setIsUpdating={setIsUpdating}
                    currentTodoId={currentTodoId}
                    setCurrentTodoId={setCurrentTodoId}
                    setTodoText={setTodoText}
                    focusToInput={focusToInput}
                  />
                );
              }
            })
        ) : (
          <div className="text-center text-xl font-semibold mt-10 text-gray-400">
            No todos found {":("}
          </div>
        )}
      </ul>

      {isOpenPopup && (
        <PopupModal isOpen={isOpenPopup} onClose={() => setIsOpenPopup(false)}>
          <WarningPopupModal
            message="Clear all todos?"
            isOpen={isOpenPopup}
            onClose={() => setIsOpenPopup(false)}
            onConfirm={handleClearConfirm}
          />
        </PopupModal>
      )}
    </div>
  );
};

export default TodosPage;
