import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import InputForm from "./InputForm";
import Detail from "./Detail";
import Main from "./main";
import SaveDatail from "./SaveDatail";
import VideoList from "./videoLIst";
import FakeList from "./FakeList";
import ChannelList from "./ChannelList";
import ChannelAnalysis from "./ChannelAnalysis";

function App() {
  return (
    <div id="wrapper">
      <nav className="navbar navbar-default top-navbar" role="navigation">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle waves-effect waves-dark"
            data-toggle="collapse"
            data-target=".sidebar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand waves-effect waves-dark" href="/">
            <i className="large material-icons">track_changes</i>{" "}
            <strong>findTube</strong>
          </a>
          <div id="sideNav" href>
            <i className="material-icons dp48">toc</i>
          </div>
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li>
            <a
              className="dropdown-button waves-effect waves-dark"
              href="#!"
              data-activates="dropdown1"
            >
              <i className="fa fa-user fa-fw" /> <b>안지호</b>{" "}
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        </ul>
      </nav>
      {/* Dropdown Structure */}
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <a href="#">
            <i className="fa fa-user fa-fw" /> My Profile
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-gear fa-fw" /> Settings
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-sign-out fa-fw" /> Logout
          </a>
        </li>
      </ul>
      {/*/. NAV TOP  */}
      <nav className="navbar-default navbar-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav" id="main-menu">
            {" "}
            <li>
              <a className="active-menu waves-effect waves-dark" href="/">
                <i className="fa fa-dashboard" />
                Fake News Search
              </a>
            </li>
            <li>
              <a href="/videoList" className="waves-effect waves-dark">
                <i className="fa fa-desktop" /> 영상 판별 결과 리스트
              </a>
            </li>
            <li>
              <a href="/FakeList" className="waves-effect waves-dark">
                <i className="fa fa-table" /> 이슈 Fake 영상
              </a>
            </li>
            <li>
              <a href="ChannlList" className="waves-effect waves-dark">
                <i className="fa fa-bar-chart-o" /> 악성 Channl 리스트
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* /. NAV SIDE  */}
      <div id="page-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InputForm />} />
            <Route path="/main" element={<Main />} />
            <Route path="/videoList" element={<VideoList />} />
            <Route path="/FakeList" element={<FakeList />} />
            <Route path="/ChannlList" element={<ChannelList />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/saveDetail/:id" element={<SaveDatail />} />
            <Route path="/channelAnalysis/:id" element={<ChannelAnalysis />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
