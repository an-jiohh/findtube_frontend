import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FakeList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [videos, setVideos] = useState([]); // 전체 동영상 목록 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/getFakeList`
      );
      console.log();
      setVideos(response.data.data);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  console.log(videos);
  console.log(searchResults);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    // 전체 동영상 목록에서 검색어에 해당하는 항목을 찾아 검색 결과로 설정
    const results = videos.filter((video) =>
      video.title.includes(event.target.value)
    );
    setSearchResults(results);
  };
  return (
    <div>
      <div class="header">
        <h1 class="page-header">이슈 Fake 영상</h1>
        <ol class="breadcrumb">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">이슈 Fake 영상</a>
          </li>
          <li class="active">Data</li>
        </ol>
      </div>
      <div id="page-inner">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-8">
            <div
              class="card"
              style={{ textAlign: "center", margin: "10px", padding: "30px" }}
            >
              <Line
                style={{
                  width: "80%",
                  height: "80%",
                  margin: "auto",
                }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "거짓 정보",
                      data: [20, 100, 200, 240, 290, 350, 654],
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                    {
                      label: "전체 영상",
                      data: [240, 290, 350, 654, 839, 1203, 1900],
                      borderColor: "rgb(53, 162, 235)",
                      backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4">
            <div
              class="card"
              style={{ textAlign: "center", margin: "10px", padding: "30px" }}
            >
              <div>금일 전체 영상 : 1900개</div>
              <div>신뢰 영상 : 1246 / 가짜 영상 : 654</div>
              <Doughnut
                style={{
                  width: "50%",
                  margin: "auto",
                }}
                data={{
                  datasets: [
                    {
                      label: ["영상개수"],
                      data: [1900 - 654, 654],
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
        <div style={{ fontSize: "30px", fontWeight: "700px", margin: "10px" }}>
          <div>화제 중인 Fake 영상</div>
        </div>
        <div style={{ fontSize: "15px", fontWeight: "700px", margin: "10px" }}>
          영상 목록에 대해 주의가 필요합니다.
        </div>
        <div class="row">
          {videos.slice(0, 2).map((video, index) => (
            <div class="col-xs-12 col-sm-12 col-md-6">
              <div class="card">
                <div className="card-action">{index + 1}등 이슈 Fake 영상</div>
                <div className="card-action">
                  <div class="text-center">
                    <img
                      style={{ margin: "auto", width: "80%" }}
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    ></img>
                  </div>
                </div>
                <div className="card-action">
                  <div style={{ height: "50px" }}>
                    <a
                      href={`/saveDetail/${video.id}`}
                      style={{ color: "black" }}
                    >
                      <h4 style={{ margin: "0px", padding: "0px" }}>
                        {video.title}
                      </h4>
                    </a>
                  </div>
                  <div>{video.channelTitle}</div>
                  <div>조회수 : {video.viewCount} 회</div>
                  {/* <div>신뢰도 : {video.reliability}</div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: "30px", fontWeight: "700px", margin: "10px" }}>
          <div>전체에서 검색</div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-action">
                <div>가짜 정보 영상 목록</div>
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
        <footer></footer>
      </div>
    </div>
  );
};

export default FakeList;
