import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Main = () => {
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
          <div class="col-xs-12 col-sm-12 col-md-6">
            <div class="row">
              <div class="col-xs-12">
                <div class="card">
                  <div class="card-image donutpad">
                    <div id="morris-donut-chart"></div>
                  </div>
                  <div class="card-action">
                    <b>YOUTUBE</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-6">
            <div class="card">
              <br />
              설명
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-16 text-lg-end text-center">
            <a class="waves-effect waves-light btn-large  py-3">
              <i class="material-icons left">search</i>button
            </a>
          </div>
        </div>

        <div class="row">
          <div class="col-md-5">
            <div class="card">
              <div class="card-image">
                <div id="morris-line-chart"></div>
              </div>
              <div class="card-action">
                <b>Line Chart</b>
              </div>
            </div>
          </div>

          <div class="col-md-7">
            <div class="card">
              <div class="card-image">
                <div id="morris-bar-chart"></div>
              </div>
              <div class="card-action">
                <b> Bar Chart Example</b>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <div class="card">
              <div class="card-image">
                <div id="morris-area-chart"></div>
              </div>
              <div class="card-action">
                <b>Area Chart</b>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12"></div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6">
          <div class="card-panel text-center">
            <h4>No. of Visits</h4>
            <div class="easypiechart" id="easypiechart-red" data-percent="46">
              <span class="percent">46%</span>
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

        <footer>
          <p>
            Shared by <i class="fa fa-love"></i>
            <a href="https://bootstrapthemes.co">BootstrapThemes</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Main;
