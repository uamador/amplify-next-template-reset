"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAIGeneration} from "@/app/client";


import {
    Button,
    Flex,
    Heading,
    Loader,
    Text,
    TextAreaField,
    View,
} from "@aws-amplify/ui-react";

import React from "react";

const client = generateClient<Schema>();

export default function App() {
    useEffect(() => {
        Amplify.configure(outputs);
    }, []);

const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

const [{data, isLoading, hasError}, Tellme] = useAIGeneration("Tellme");


    const handleClick = async () => {
        try {
            const response = await Tellme({
                content: "Hello"
            });
            console.log('AI Response:', response);
        } catch (err) {
            console.error('Error:', err);
        }
    };

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });

   }

    return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
        <div>
            <Button onClick={handleClick}>Tell Me Function</Button>
        </div>
    </main>
  );
}
