function loadExternalJS() {
  // 필요한 파일들을 동적으로 생성해줍니다.
  const scriptJquery = document.createElement("script");
  scriptJquery.src = "/assets/js/jquery-1.10.2.js";
  scriptJquery.async = true;

  const bootstrap = document.createElement("script");
  bootstrap.src = "/assets/js/bootstrap.min.js";
  bootstrap.async = true;

  const materialize = document.createElement("script");
  materialize.src = "/assets/materialize/js/materialize.min.js";
  materialize.async = true;

  const metisMenu = document.createElement("script");
  metisMenu.src = "/assets/js/jquery.metisMenu.js";
  metisMenu.async = true;

  const raphael = document.createElement("script");
  raphael.src = "/assets/js/morris/raphael-2.1.0.min.js";
  raphael.async = true;

  const morris = document.createElement("script");
  morris.src = "/assets/js/morris/morris.js";
  morris.async = true;

  const easypiechart = document.createElement("script");
  easypiechart.src = "/assets/js/easypiechart.js";
  easypiechart.async = true;

  const easypiechartdata = document.createElement("script");
  easypiechartdata.src = "/assets/js/easypiechart-data.js";
  easypiechartdata.async = true;

  const jquerychart = document.createElement("script");
  jquerychart.src = "/assets/js/Lightweight-Chart/jquery.chart.js";
  jquerychart.async = true;

  const customscripts = document.createElement("script");
  customscripts.src = "/assets/js/custom-scripts.js";
  customscripts.async = true;

  //   const dataTablesbootstrap = document.createElement("script");
  //   dataTablesbootstrap.src = "/assets/js/dataTables/dataTables.bootstrap.js";
  //   dataTablesbootstrap.async = true;

  //   const jquerydataTables = document.createElement("script");
  //   jquerydataTables.src = "/assets/js/dataTables/jquery.dataTables.js";
  //   jquerydataTables.async = true;

  // 생성된 script 요소들을 body에 붙여주세요
  document.body.appendChild(scriptJquery);
  document.body.appendChild(bootstrap);
  document.body.appendChild(materialize);
  document.body.appendChild(metisMenu);
  document.body.appendChild(raphael);
  document.body.appendChild(morris);
  document.body.appendChild(easypiechart);
  document.body.appendChild(easypiechartdata);
  document.body.appendChild(jquerychart);
  document.body.appendChild(customscripts);
  //   document.body.appendChild(dataTablesbootstrap);
  //   document.body.appendChild(jquerydataTables);
}

export default loadExternalJS;
