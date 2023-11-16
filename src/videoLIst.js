import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const VideoList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [videos, setVideos] = useState([]); // 전체 동영상 목록 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/getVideoList`
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
        <h1 class="page-header">영상 판별 결과 리스트</h1>
        <ol class="breadcrumb">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">영상 판별 결과 리스트</a>
          </li>
          <li class="active">Data</li>
        </ol>
      </div>
      <div id="page-inner">
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

export default VideoList;
