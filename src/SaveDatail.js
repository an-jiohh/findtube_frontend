import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const SaveDatail = () => {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [channelTitle, setChannelTitle] = useState();
  const [script, setScript] = useState();
  const [summary, setSummary] = useState();
  const [keyword, setKeword] = useState();
  const [wiki, setWiki] = useState();
  const [naver, setNaver] = useState();
  const [reason, setReason] = useState();
  const [reliability, setReliability] = useState();
  const [Discrimination, setDiscrimination] = useState();
  const [likeCount, setLikeCount] = useState();
  const [viewCount, setViewCount] = useState();

  useEffect(() => {
    getTitle();
    getInfo();
  }, []);

  const getTitle = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=KEY`
      );
      console.log(response.data.items);
      if (response.data.items.length == 0) {
        setTitle("영상이 없습니다.");
      } else {
        console.log(response.data.items[0]);
        setTitle(response.data.items[0].snippet.title);
        setDescription(response.data.items[0].snippet.description);
        setChannelTitle(response.data.items[0].snippet.channelTitle);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      alert("링크가 복사되었습니다.");
    } catch (error) {
      alert("복사 실패");
    }
  };

  const getInfo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/getfakeVideo`,
        { data: id }
      );
      console.log(response.data);
      setScript(response.data.script);
      setSummary(response.data.summary);
      setKeword(response.data.keyword);
      setWiki(response.data.wiki);
      setNaver(response.data.naver);
      setReason(response.data.reason);
      setReliability(response.data.reliability);
      setDiscrimination(response.data.discrimination);
      setViewCount(response.data.viewCount);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <div>
      <div class="header">
        <h1 class="page-header">판별데이터 보기</h1>
        <ol class="breadcrumb">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li class="active">Data</li>
        </ol>
      </div>
      <div id="page-inner">
        <div class="dashboard-cards"></div>

        <div class="row">
          <div class="col-xs-12 col-sm-12 ">
            <div class="row">
              <div class="col-xs-12">
                <div class="card">
                  <div class="card-image donutpad">
                    <div class="text-center">
                      <img
                        style={{ margin: "auto", width: "80%" }}
                        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                      ></img>
                    </div>
                  </div>
                  <div class="card-action">
                    <h3 className="m-5">{title}</h3>
                    <div class="m-5">{channelTitle}</div>
                    <div className="m-5">{description}</div>
                    <div className="m-5">
                      조회수 : {viewCount} 좋아요 수 :{likeCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {reason && (
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-7">
              <div
                class="card"
                style={
                  Discrimination == 0
                    ? {
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                      }
                    : {
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                      }
                }
              >
                {reason && (
                  <div
                    className="card-action"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0" }}
                  >
                    판별결과
                  </div>
                )}
                {reason && (
                  <div
                    className="card-action"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0" }}
                  >
                    {Discrimination == 0 ? "참" : "거짓"}
                  </div>
                )}
              </div>
              <div class="card">
                {reason && <div className="card-action">{reason}</div>}
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-5">
              <div class="card-panel text-center">
                <h4>신뢰도</h4>
                <Doughnut
                  data={{
                    datasets: [
                      {
                        label: "신뢰도",
                        data: [reliability, 100 - reliability],
                        backgroundColor: [
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 99, 132, 0.2)",
                        ],
                      },
                    ],
                  }}
                ></Doughnut>
              </div>
            </div>
          </div>
        )}
        <div class="row ">
          <div class="col-xs-12">
            <div class="card">
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
                onClick={() =>
                  handleCopyClipBoard(`http://localhost:3000/saveDetail/${id}`)
                }
              >
                <div>결과 주소 : http://localhost:3000/saveDetail/{id}</div>
                <div>박스를 클릭하여 공유해보세요.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="row ">
          <div class="col-xs-12">
            <div class="card">
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>자막 정보</div>
                {script && <div>가져오기 완료</div>}
              </div>
              {script && (
                <div
                  className="card-action"
                  style={{ height: "200px", overflow: "scroll" }}
                >
                  {script}
                </div>
              )}
            </div>
          </div>
        </div>

        <div class="row ">
          <div class="col-xs-12">
            <div class="card">
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>요약 과정</div>
                {summary && <div>요약 완료</div>}
              </div>

              {summary && (
                <div>
                  <div
                    className="card-action"
                    style={{ height: "200px", overflow: "scroll" }}
                  >
                    {summary}
                  </div>
                  <div className="card-action">{keyword}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div class="row ">
          <div class="col-xs-12">
            <div class="card">
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>위키 데이터</div>
                {wiki && <div>위키 데이터 완료</div>}
              </div>
              <div style={{ height: "200px", overflow: "scroll" }}>
                {wiki &&
                  wiki.map((item, index) => (
                    <div className="card-action" key={index}>
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div class="row ">
          <div class="col-xs-12">
            <div class="card">
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>네이버 데이터</div>
                {naver && <div>네이버 데이터 완료</div>}
              </div>
              <div style={{ height: "200px", overflow: "scroll" }}>
                {naver &&
                  naver.map((item, index) => (
                    <div className="card-action" key={index}>
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div class="row ">
          <div class="col-xs-12">
            <div class="card">
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>판별</div>
                {reason && <div>판별 완료</div>}
              </div>
            </div>
          </div>
        </div>

        <div class="fixed-action-btn horizontal click-to-toggle">
          <a class="btn-floating btn-large red">
            <i class="material-icons">menu</i>
          </a>
          <ul>
            <li>
              <a class="btn-floating red">
                <i class="material-icons">track_changes</i>
              </a>
            </li>
            <li>
              <a class="btn-floating yellow darken-1">
                <i class="material-icons">format_quote</i>
              </a>
            </li>
            <li>
              <a class="btn-floating green">
                <i class="material-icons">publish</i>
              </a>
            </li>
            <li>
              <a class="btn-floating blue">
                <i class="material-icons">attach_file</i>
              </a>
            </li>
          </ul>
        </div>

        <footer></footer>
      </div>
    </div>
  );
};

export default SaveDatail;
