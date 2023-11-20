import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from 'store/index';
import { addTodo} from 'store/slices/todoSlices';
import { useForm, SubmitHandler } from "react-hook-form"
import { StringMappingType } from 'typescript';
import {useAppDispatch, useAppSelector} from 'hooks';

type Todo = {
  id: string;
  title : string;
  completed: boolean;
}

type IFormInput = {
  task: string;
}

function Todo() {
  const todos = useAppSelector((state) => state.todos.list);
  const dispatch = useAppDispatch();

  const {register, reset , handleSubmit} = useForm<IFormInput>()

  const onHandleSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch( addTodo(data.task));
    reset();
  };
  return (
        <div>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
              <input type="text" {...register("task")} />
              <button type='submit'>add</button>
            </form>

            <div>
                {todos.map((t:Todo,i: number) => (<div key={i}>{t.title}</div>))}
              </div>
        </div>
  )
}

export default Todo;
