import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const InputForm = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/link`,
        { data: inputValue }
      );
      console.log("서버 응답:", response.data);
      alert(response.data.message);
      navigate(`/detail/${response.data.message}`);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <div>
      <div class="header">
        <h1 class="page-header">Fake News Search</h1>
        <ol class="breadcrumb">
          <li>
            <a href="#">Home</a>
          </li>
          <li class="active">Fake News Search</li>

          <li>
            {" "}
            <a href="#">Dashboard</a>
          </li>
        </ol>
      </div>{" "}
      {/* header --end */}
      <div class="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h2
              style={{ fontSize: "50px", fontWeight: "700px", margin: "50px" }}
            >
              가짜뉴스 검색
            </h2>
            <div
              style={{
                height: "65px",
                width: "650px",
                border: "5px solid red",
                background: "#ffffff",
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="동영상 링크를 입력해주세요"
                style={{
                  fontSize: "25px",
                  width: "500px",
                  border: "0",
                  outline: "none",
                  padding: "10px",
                  float: "left",
                  margin: "0",
                }}
              />
              <button
                type="submit"
                style={{
                  fontSize: "25px",
                  width: "100px",
                  border: "0",
                  outline: "none",
                  background: "red",
                  float: "right",
                  height: "100%",
                  color: "#ffffff",
                }}
              >
                검색
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <p style={{ float: "left" }}>
                동영상 링크를 입력하여 간편하게 가짜 뉴스를 확인해 보세요!
              </p>
              <h3 style={{ margin: "40px", fontSize: "30px" }}>
                Scanned by YouTube
              </h3>
            </div>
          </form>
        </div>
        <div class="row" style={{}}>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <div class="card">
              <div class="card-image donutpad">
                <img
                  style={{ margin: "auto", width: "80%" }}
                  src={"/img/fakestop.jpeg"}
                ></img>
              </div>
            </div>
          </div>

          <div
            class="col-xs-12 col-sm-12 col-md-6"
            style={{ marginTop: "20px" }}
          >
            <p style={{ fontSize: "20px" }}>
              가짜 뉴스는 현대 사회에 심각한 영향을 미칩니다. 이는 사회 분열,
              혼란, 그리고 실질적인 피해를 초래할 수 있습니다. 가짜 뉴스로 인해
              허위 정보를 믿고 잘못된 결정을 내릴 수 있으며, 이는 개인과 사회의
              안전에 직간접적인 위협을 가합니다. 또한, 실제 사건과 뉴스를
              혼동하거나, 비난과 혐오를 부추기며 사회적 긴장을 증가시킬 수
              있습니다. 따라서 가짜 뉴스를 식별하고 대응하는 것은 중요하며, 뉴스
              소비자, 미디어, 정부, 그리고 교육 기관은 이 문제에 대한 종합적인
              대책을 마련해야 합니다.
            </p>
          </div>
        </div>{" "}
        {/* row --end */}
      </div>{" "}
      {/* container --end */}
    </div>
  );
};

export default InputForm;
