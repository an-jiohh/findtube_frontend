import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
function Detail() {
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
  const [channelId, setChannelId] = useState();
  const isMount = useRef();
  const [count, setCount] = useState(0);
  const [tag, setTag] = useState([]);
  const navigate = useNavigate();
  const increaseCount = () => {
    setCount(count + 1);
  };

  const getScript = async () => {
    increaseCount();
    isMount.current = true;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/script`,
        { data: id }
      );
      setScript(response.data.script);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    getTitle();
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
        setTag(response.data.items[0].snippet.tags);
        setViewCount(response.data.items[0].statistics.viewCount);
        setLikeCount(response.data.items[0].statistics.likeCount);
        setChannelId(response.data.items[0].snippet.channelId);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };
  console.log(channelId);

  useEffect(() => {
    if (isMount.current) {
      increaseCount();
      getSummary();
    }
  }, [script]);

  const getSummary = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/summary`,
        { data: script }
      );
      setSummary(response.data.summary);
      setKeword(response.data.keyword);
      // setKeword(tag);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    if (isMount.current) {
      increaseCount();
      console.log("startwiki");
      getWiki();
    }
  }, [summary]);

  const getWiki = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/wiki`,
        { data: keyword }
      );
      setWiki(response.data.wiki);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    if (isMount.current) {
      increaseCount();
      console.log("startNaver");
      getNaver();
    }
  }, [wiki]);

  const getNaver = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/naver`,
        { data: keyword }
      );
      setNaver(response.data.naver);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    if (isMount.current) {
      increaseCount();
      console.log("startEnd");
      getDetected();
    }
  }, [naver]);

  useEffect(() => {
    if (isMount.current) {
      increaseCount();
    }
  }, [reason]);

  const getDetected = async () => {
    let json_str = "";
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/detected`,
        { summary: summary, naver: naver, wiki: wiki }
      );
      json_str = response.data.detected;
      console.log(json_str);
      const descr = JSON.parse(json_str);
      setReason(descr.reason);
      setReliability(descr.reliability);
      setDiscrimination(descr.Discrimination);
    } catch (error) {
      console.error("에러:", error);
      setReason(json_str);
    }
  };
  const saveVideoInfo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/savefakeVideo`,
        {
          id: id,
          title: title,
          description: description,
          channelTitle: channelTitle,
          script: script,
          summary: summary,
          keyword: keyword,
          wiki: wiki,
          naver: naver,
          reason: reason,
          reliability: reliability,
          Discrimination: Discrimination,
          viewCount: viewCount,
          likeCount: likeCount,
          channelId: channelId,
        }
      );
      navigate(`/saveDetail/${id}`);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  return (
    <div>
      <div class="header">
        <h1 class="page-header">Dashboard</h1>
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

        <div class="row">
          <div class="col-xs-16 text-lg-end text-center">
            <a
              class="waves-effect waves-light btn-large  py-3"
              onClick={getScript}
            >
              <i class="material-icons left">search</i>판별 시작
            </a>
          </div>
        </div>

        <div class="row ">
          <div class="col-xs-12">
            <div
              class="card"
              style={
                count === 1
                  ? { backgroundColor: "rgba(54, 162, 235, 0.2)" }
                  : !script
                  ? { backgroundColor: "rgba(255, 99, 132, 0.2)" }
                  : { backgroundColor: "rgba(75, 192, 192, 0.2)" }
              }
            >
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>자막 정보</div>
                {!script && count !== 1 && <div>자막 대기</div>}
                {count === 1 && <div>가져오는 중</div>}
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
            <div
              class="card"
              style={
                count === 2
                  ? { backgroundColor: "rgba(54, 162, 235, 0.2)" }
                  : !summary
                  ? { backgroundColor: "rgba(255, 99, 132, 0.2)" }
                  : { backgroundColor: "rgba(75, 192, 192, 0.2)" }
              }
            >
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>요약 과정</div>
                {!summary && count !== 2 && <div>요약 대기</div>}
                {count === 2 && <div>요약 중</div>}
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
            <div
              class="card"
              style={
                count === 3
                  ? { backgroundColor: "rgba(54, 162, 235, 0.2)" }
                  : !wiki
                  ? { backgroundColor: "rgba(255, 99, 132, 0.2)" }
                  : { backgroundColor: "rgba(75, 192, 192, 0.2)" }
              }
            >
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>위키 데이터</div>
                {!wiki && count !== 3 && <div>위키 데이터 대기</div>}
                {count === 3 && <div>위키 데이터를 찾는 중입니다.</div>}
                {wiki && <div>위키 데이터 완료</div>}
              </div>
              <div style={{ maxHeight: "200px", overflow: "scroll" }}>
                {wiki &&
                  wiki.map((item, index) => (
                    <div className="card-action " key={index}>
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div class="row ">
          <div class="col-xs-12">
            <div
              class="card"
              style={
                count === 4
                  ? { backgroundColor: "rgba(54, 162, 235, 0.2)" }
                  : !naver
                  ? { backgroundColor: "rgba(255, 99, 132, 0.2)" }
                  : { backgroundColor: "rgba(75, 192, 192, 0.2)" }
              }
            >
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>네이버 데이터</div>
                {!naver && count !== 4 && <div>네이버 데이터 대기</div>}
                {count === 4 && <div>네이버 데이터를 찾는 중입니다.</div>}
                {naver && <div>네이버 데이터 완료</div>}
              </div>
              <div style={{ maxHeight: "200px", overflow: "scroll" }}>
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
            <div
              class="card"
              style={
                count === 5
                  ? { backgroundColor: "rgba(54, 162, 235, 0.2)" }
                  : !reason
                  ? { backgroundColor: "rgba(255, 99, 132, 0.2)" }
                  : { backgroundColor: "rgba(75, 192, 192, 0.2)" }
              }
            >
              <div
                class="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>판별</div>
                {!reason && count !== 5 && <div>판별 대기</div>}
                {count === 5 && <div>판별을 기다리는 중입니다.</div>}
                {reason && <div>판별 완료</div>}
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
        <div class="row">
          <div
            class="col-xs-16 text-lg-end text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              판별 내용이 맞다면 확인을 눌러주세요.
            </div>
            <a
              class="waves-effect waves-light btn-large  py-3"
              onClick={saveVideoInfo}
            >
              <i class="material-icons left">save</i>저장하기
            </a>
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
}

export default Detail;
