import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChannelAnalysis = () => {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [videoCount, setVideoCount] = useState();
  const [viewCount, setViewCount] = useState();
  const [thumbnails, setThumbnails] = useState();
  const [subscriberCount, setSubscriberCount] = useState();
  const [discriminationCounts, setDiscriminationCounts] = useState();
  const [count, setCount] = useState();

  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [videos, setVideos] = useState([]); // 전체 동영상 목록 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  useEffect(() => {
    getTitle();
    getInfo();
  }, []);

  const getTitle = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${id}&key=KEY`
      );
      console.log(response.data.items);
      if (response.data.items.length == 0) {
        setTitle("영상이 없습니다.");
      } else {
        console.log(response.data.items[0]);
        setTitle(response.data.items[0].snippet.title);
        setDescription(response.data.items[0].snippet.description);
        setThumbnails(response.data.items[0].snippet.thumbnails.medium.url);
        setSubscriberCount(response.data.items[0].statistics.subscriberCount);
        setVideoCount(response.data.items[0].statistics.videoCount);
        setViewCount(response.data.items[0].statistics.viewCount);
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
  console.log(discriminationCounts);
  console.log(count);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    // 전체 동영상 목록에서 검색어에 해당하는 항목을 찾아 검색 결과로 설정
    const results = videos.filter((video) =>
      video.title.includes(event.target.value)
    );
    setSearchResults(results);
  };

  const getInfo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/getFakeVideoByChannel`,
        { data: id }
      );
      console.log(response.data);
      setVideos(response.data.data);
      setSearchResults(response.data.data);
      setDiscriminationCounts(response.data.discrimination_counts);
      setCount(response.data.counts);
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
        <div style={{ fontSize: "30px", fontWeight: "700px", margin: "10px" }}>
          <div>채널 정보</div>
        </div>
        <div style={{ fontSize: "15px", fontWeight: "700px", margin: "10px" }}>
          youtube Analysis기반 채널 정보 입니다.
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-3">
            <div class="card">
              <img
                style={{ margin: "auto", width: "100%" }}
                src={thumbnails}
              ></img>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-9">
            <div class="card">
              <div className="card-action">
                <h3 className="m-5">{title}</h3>
              </div>
              <div className="card-action">
                <div className="m-5">채널 설명</div>
                <div className="m-5">{description}</div>
              </div>
              <div className="" style={{ display: "flex" }}>
                <div className="col-md-4 center">
                  <div className="card-action">구독자 수</div>{" "}
                  <div className="card-action">{subscriberCount}</div>
                </div>
                <div className="col-md-4 center">
                  <div className="card-action">전체 조회 수</div>{" "}
                  <div className="card-action">{viewCount}</div>
                </div>
                <div className="col-md-4 center">
                  <div className="card-action">등록 영상 수</div>{" "}
                  <div className="card-action">{videoCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: "30px", fontWeight: "700px", margin: "10px" }}>
          <div>채널 분석</div>
        </div>
        <div style={{ fontSize: "15px", fontWeight: "700px", margin: "10px" }}>
          영상 목록에 대해 주의가 필요합니다.
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-4">
            <div class="card">
              <div
                className="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div class="text-center">전체 영상 수</div>
                <div class="text-center">{count}</div>
              </div>
              <div
                className="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div class="text-center">진짜 판별 영상 수</div>
                <div class="text-center">{count - discriminationCounts}</div>
              </div>
              <div
                className="card-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div class="text-center">가짜 판별 영상 수</div>
                <div class="text-center">{discriminationCounts}</div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4">
            <div
              class="card"
              style={{ textAlign: "center", margin: "10px", padding: "30px" }}
            >
              <div class="text-center">가짜 영상 비율</div>
              <Doughnut
                style={{
                  width: "100%",
                  margin: "auto",
                }}
                data={{
                  datasets: [
                    {
                      label: ["영상개수"],
                      data: [
                        discriminationCounts,
                        count - discriminationCounts,
                      ],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                      ],
                    },
                  ],
                }}
              ></Doughnut>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4">
            <div
              class="card"
              style={{ textAlign: "center", margin: "10px", padding: "30px" }}
            >
              <div class="text-center">채널 판별</div>
              {count - discriminationCounts < discriminationCounts && (
                <div style={{ backgroundColor: "rgba(255, 99, 132, 0.2)" }}>
                  <div class="text-center card-action">의심</div>
                  <div class="card-content">
                    해당 채널은 가짜뉴스 영상 비율이 높습니다.
                  </div>
                </div>
              )}
              {count - discriminationCounts >= discriminationCounts && (
                <div style={{ backgroundColor: "rgba(255, 99, 132, 0.2)" }}>
                  <div class="text-center card-action">적정</div>
                  <div class="card-content">
                    해당 채널은 가짜뉴스 영상이 적습니다.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ fontSize: "30px", fontWeight: "700px", margin: "10px" }}>
          <div>채널 영상</div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-action">
                <div>채널 영상 목록</div>
                <div>검색창을 이용하여 검색할 수 있습니다.</div>
              </div>
              <div class="card-content">
                <div class="table-responsive">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                  <table
                    class="table table-striped table-bordered table-hover"
                    id="dataTables-example"
                  >
                    <thead>
                      <tr>
                        <th>영상 ID</th>
                        <th>영상 제목</th>
                        <th>채널 명</th>
                        <th>조회 수</th>
                        <th>판별 결과</th>
                        <th>신뢰도</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((video, index) => (
                        <tr class="odd gradeX">
                          <td>{video.id}</td>
                          <td>
                            <a href={`/saveDetail/${video.id}`}>
                              {video.title}
                            </a>
                          </td>
                          <td>{video.channelTitle}</td>
                          <td class="center">{video.viewCount}</td>
                          <td class="center">
                            {video.discrimination == 0 ? "참" : "거짓"}
                          </td>
                          <td class="center">{video.reliability}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                onClick={() =>
                  handleCopyClipBoard(
                    `http://localhost:3000/channelAnalysis/${id}`
                  )
                }
              >
                <div>
                  결과 주소 : http://localhost:3000/channelAnalysis/{id}
                </div>
                <div>박스를 클릭하여 공유해보세요.</div>
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

export default ChannelAnalysis;
