import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [addList, setAddList] = useState([]);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);
  const [use, setUse] = useState(0);
  const [eachTitle, setEachTitle] = useState("");
  const [eachText, setEachText] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  const handleAddList = () => {
    setCount(count + 1);
    const newarr = addList;
    newarr[count] = { listTitle: title, subCount: 0, subList: [] };
    setAddList(newarr);
    console.log(addList);
  };

  const handleCard = (index) => {
    setUse(use + 1);
    console.log("index", index);
    const subct = addList[index]["subCount"];
    addList[index]["subList"][subct] = {
      title: eachTitle,
      text: eachText,
    };
    addList[index]["subCount"] += 1;
  };

  const handleDelTile = (index) => {
    const newarray = addList.filter((card, id) => index !== id);
    setAddList(newarray);
    console.log(newarray, addList);
  };
  const handleDelItem = (index, subIndex) => {
    const newarray = addList;
    newarray[index]["subList"] = newarray[index]["subList"].filter(
      (card, id) => subIndex !== id
    );
    setAddList(newarray);

    setUse(use + 1);
  };
  useEffect(() => {}, [addList]);
  return (
    <div className="App">
      <div className="dashboard_title">Dashboard</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {addList.map((o, index) => {
          return (
            <div className="card_tile">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "200px",
                }}
              >
                <p>{o.listTitle}</p>
                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                  onClick={() => {
                    handleDelTile(index);
                  }}
                >
                  X
                </button>
              </div>
              {o.subList?.map((subobj, subIndex) => {
                return (
                  <div
                    style={{
                      backgroundColor: "white",
                      margin: "10px 0px",
                      padding: "5px 10px",
                      width: "230px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "180px",
                      }}
                    >
                      <p style={{ fontSize: "16px" }}>{subobj.title}</p>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => {
                          handleDelItem(index, subIndex);
                        }}
                      >
                        X
                      </button>
                    </div>

                    <p>{subobj.text}</p>
                  </div>
                );
              })}
              <div style={{ backgroundColor: "white" }}>
                <input
                  type="input"
                  placeholder="Enter title"
                  onChange={(e) => {
                    setEachTitle(e.target.value);
                  }}
                />
                <input
                  type="input"
                  placeholder="Enter text for this card"
                  onChange={(e) => {
                    setEachText(e.target.value);
                  }}
                />
              </div>
              <button
                className="add_list_button"
                onClick={() => {
                  handleCard(index);
                }}
              >
                Add card
              </button>
            </div>
          );
        })}
        <div className="card_tile">
          <input
            type="input"
            placeholder="Enter list title"
            style={{ width: "240px", border: "none" }}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button className="add_list_button" onClick={handleAddList}>
            ADD LIST
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
