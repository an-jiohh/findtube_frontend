import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const ChannelList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [videos, setVideos] = useState([]); // 전체 동영상 목록 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/getFakeChannelList`
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
        <h1 class="page-header">악성 Channel 리스트</h1>
        <ol class="breadcrumb">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">악성 Channel 리스트</a>
          </li>
          <li class="active">Data</li>
        </ol>
      </div>
      <div id="page-inner">
        <div class="row ">
          {videos.slice(0, 4).map((video, index) => (
            <div class="col-xs-3">
              <div class="card">
                <div class="card-action center">
                  <div>적발 순위 {index + 1} 등</div>
                </div>
                <a href={`/channelAnalysis/${video.channelId}`}>
                  <div
                    class="card-action center"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{video.channelTitle}</div>
                    <div>{video.count}개</div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-action">Advanced Tables</div>
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
                        <th>채널 이동</th>
                        <th>채널 명</th>
                        <th>가짜 영상 수</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((video, index) => (
                        <tr class="odd gradeA">
                          <td>
                            <a
                              href={`https://www.youtube.com/channel/${video.channelId}`}
                            >
                              {video.channelTitle}
                            </a>
                          </td>
                          <td>
                            <a href={`/channelAnalysis/${video.channelId}`}>
                              {video.channelTitle}
                            </a>
                          </td>
                          <td class="center">{video.count}</td>
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

export default ChannelList;
