import React, { useState } from "react";
import _ from "lodash";
import HotspotMap from "./map/HotspotMap";
import CasesMap from "./map/CasesMap";
import { HotspotLegend, CasesLegend } from "./mapLegends";
import build_data from './build_job.json'
import moment from "moment";
function Map(props) {
  const [mapType, setMapType] = useState("hotspot");
  return (
    <div style={{ position: "relative" }}>
      <div className="container mb-3 mb-md-0 row mx-auto flex-column-reverse flex-md-row">
        <div
          className="col-md-6 mb-3"
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          {mapType === "hotspot" && <HotspotLegend />}
          {mapType === "cases" && <CasesLegend />}
        </div>

        <div className="col-md-6 mb-3 d-flex justify-content-center">
          <button
            onClick={() => setMapType("hotspot")}
            className="btn btn-dark px-3 mr-4"
            style={{
              height: 120,
              width: 200,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: "url(/hotspots-map.png)",
            }}
          >
            <div className="d-flex h-100 align-items-end">
              <span>การระบาดในจังหวัด</span>
            </div>
          </button>
          <button
            onClick={() => setMapType("cases")}
            className="btn btn-dark px-3"
            style={{
              height: 120,
              width: 200,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: "url(/cases-map.png)",
            }}
          >
            <div className="d-flex h-100 align-items-end">
              <span>ตำแหน่งการระบาด</span>
            </div>
          </button>
        </div>
      </div>
      {mapType === "hotspot" && <HotspotMap province_data={props.province_data} />}
      {mapType === "cases" && <CasesMap district_data={props.district_data} />}
      <div className="container text-sec mt-3 credit" style={{ maxWidth: 810 }}>
        ที่มาข้อมูล: รายงาน COVID-19 ประจำวัน ข้อมูลประจำประเทศไทย
        จากกรมควบคุมโรค กระทรวงสาธารณสุข, สถิติประชากรศาสตร์
        สำนักงานสถิติแห่งชาติ (อัพเดทล่าสุดเมื่อ {moment(build_data['job']['dataset_updated_on']).format('LL')})
      </div>
    </div>
  );
}

export default Map;
