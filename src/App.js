import { computeHeadingLevel } from "@testing-library/dom";
import { useState } from "react";
import "./App.css";

const RenderList = (list) => {
  console.log(list);
  if (list && list.length)
    return list.map((element) => {
      return <span>{element}</span>;
    });
  return "List is empty";
};

function App() {
  // const [listA, setListA] = useState([1, 2, 3, 4]);
  // const [listB, setListB] = useState([1, 2, 5, 6]);
  const [listA, setListA] = useState(null);
  const [listB, setListB] = useState(null);

  const [aElement, setAElement] = useState(0);
  const [bElement, setBElement] = useState(0);

  const [onlyA, setOnlyA] = useState(null);
  const [onlyB, setOnlyB] = useState(null);
  const [inter, setInter] = useState(null);
  const [union, setUnion] = useState(null);

  const handleClickA = () => {
    if (aElement === "") {
      setAElement(0);
      listA ? setListA([...listA, 0]) : setListA([0]);
    } else listA ? setListA([...listA, aElement]) : setListA([aElement]);
  };

  const handleClickB = () => {
    if (bElement === "") {
      setAElement(0);
      listB ? setListB([...listB, 0]) : setListB([0]);
    } else listB ? setListB([...listB, bElement]) : setListB([bElement]);
  };

  const getInter = () => {
    if (listA === null || listB === null) return null;
    let lsa = Array.from(new Set([...listA]));
    return lsa.filter((ele) => {
      return listB.includes(ele);
    });
  };

  const getOnlyA = () => {
    if (listA !== null)
      return listA.filter((ele) => {
        return listB !== null ? !listB.includes(ele) : true;
      });
    return null;
  };

  const getOnlyB = () => {
    if (listB !== null)
      return listB.filter((ele) => {
        return listA !== null ? !listA.includes(ele) : true;
      });
  };

  const getUnion = () => {
    if (listA === null) return listB;
    else if (listB === null) return listA;
    return Array.from(new Set([...listA, ...listB]));
  };

  const compute = () => {
    let onlyA = [],
      onlyB = [],
      inter = [],
      union = [];

    onlyA = getOnlyA();
    onlyB = getOnlyB();
    inter = getInter();
    union = getUnion();

    // console.log(onlyA);
    // console.log(onlyB);
    // console.log(inter);
    // console.log(union);

    setOnlyA(onlyA);
    setOnlyB(onlyB);
    setInter(inter);
    setUnion(union);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.id === "listAIP" ? handleClickA() : handleClickB();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <label for="listAIP">List A:</label>{" "}
          {listA ? RenderList(listA) : "List is empty"}
          <br />
          <p>
            <input
              id="listAIP"
              onKeyDown={handleKeyDown}
              value={aElement}
              onInput={(e) =>
                setAElement(
                  e.target.value === "" ? 0 : parseInt(e.target.value)
                )
              }
            />
            <button className="addButton" onClick={() => handleClickA()}>
              +
            </button>
          </p>
        </p>
        <p>
          <label for="listBIP">List B:</label>{" "}
          {listB ? RenderList(listB) : "List is empty"}
          <br />
          <p>
            <input
              id="listBIP"
              onKeyDown={handleKeyDown}
              value={bElement}
              onInput={(e) =>
                setBElement(
                  e.target.value === "" ? 0 : parseInt(e.target.value)
                )
              }
            />
            <button className="addButton" onClick={() => handleClickB()}>
              +
            </button>
          </p>
        </p>
        <button
          id="computeButton"
          onClick={() => {
            compute();
          }}
        >
          COMPUTE
        </button>
        <p>Elements present only in A: {RenderList(onlyA)}</p>
        <p>Elements present only in B: {RenderList(onlyB)}</p>
        <p>Elements present in both A and B: {RenderList(inter)}</p>
        <p>Elements present in combined A and B: {RenderList(union)}</p>
      </header>
    </div>
  );
}

export default App;
