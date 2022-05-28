/* eslint-disable prettier/prettier */
import { useState } from "react";
import Header from "./components/Header/Header";
import InputBox from "./components/InputBox/InputBox";
import ButtonGroup from "./components/ButtonGroup/ButtonGroup";
import Tarea from "./components/Tarea/Tarea";
import { Flex, useColorModeValue, Stack, Input } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [arrayTareas, setTareas] = useState(
    JSON.parse(window.localStorage.getItem("arrayTareas")) || [] 
  );
  const [filtro, setFiltro] = useState("todos");
  const [inputS, setInput] = useState("");

  const handleClickAll = (info) => {
    setFiltro("todos");
  };

  const handleChangeSearch = (event) => {
    setInput(event.target.value);
  };

  const handleClickComplete = (info) => {
    setFiltro("completos");
  };
  const handleClickIncomplete = (info) => {
    setFiltro("incompletos");
  };
  const setLocalStorage = (value) => {
    // setTareas(value);
    const valorLocal = JSON.stringify(value);
    window.localStorage.setItem("arrayTareas", valorLocal);
  };

  // setLocalStorage([1, 2, 3]);

  const addList = (nota) => {
    const notaAgregada= [...arrayTareas, { nota, isCompleted: false, id:uuidv4()
 }]
    setTareas(notaAgregada);
    setLocalStorage(notaAgregada);
  };

  const toggleCompleted = (tarea) => {
    const itemCompleted = arrayTareas.map((itemMap) => {
      if (itemMap.id === tarea.id) {
        const updateItemMp = {
          ...itemMap,
          isCompleted: !itemMap.isCompleted,
        };
        return updateItemMp;
      }
      return itemMap;
    });
    setTareas(itemCompleted);
    setLocalStorage (itemCompleted)
  };

  /* Elimina la tarea mediante un filter a arrayTareas, esta función se la pasaremos al
  botón de eliminar. 
  */
  const deleteItem = (item) => {
    const itemFilter = arrayTareas.filter((itemLista) => itemLista !== item);
    setTareas(itemFilter);
      setLocalStorage(itemFilter);
  };

  console.log(arrayTareas);

  return (
    <Flex
      minH={"100vh"}
      bg={useColorModeValue("gray.50", "gray.800")}
      justifyContent={"center"}
    >
      <Stack spacing={5} mx={"auto"} py={10} w={"380px"}>
        <Header></Header>

        <InputBox
          info={arrayTareas}
          setLocalStorage={setLocalStorage}
          addList={addList}
        ></InputBox>

        <Input
          type="text"
          id="buscar"
          placeholder="Search your task"
          value={inputS}
          onChange={() => handleChangeSearch(event)}
        ></Input>

        <Stack
          w={"100%"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={4}
          my={5}
        >
          <ButtonGroup
            info={arrayTareas}
            handleClickAll={handleClickAll}
            handleClickComplete={handleClickComplete}
            handleClickIncomplete={handleClickIncomplete}
          ></ButtonGroup>
          <Flex flexDirection="column" justifyContent={"space-between"}>
            {arrayTareas
              .filter((item) => {
                return (
                  (filtro === "todos" ||
                    (filtro === "completos" && item.isCompleted) ||
                    (filtro === "incompletos" && !item.isCompleted)) &&
                  item.nota.toLowerCase().includes(inputS.toLowerCase())
                );
              })
              .map((item) => {
                return (
                  <Tarea
                    setTareas={setTareas}
                    info={arrayTareas}
                    key={item.nota}
                    item={item}
                    toggleCompleted={toggleCompleted}
                    deleteItem={deleteItem}
                    setLocalStorage={setLocalStorage}
                  ></Tarea>
                );
              })}
          </Flex>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default App;
