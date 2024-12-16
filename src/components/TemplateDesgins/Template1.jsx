import * as React from "react";
import "./Main.css";
import { appState } from "../../reduxStore/Slice/appSlice";
import { useSelector } from "react-redux";

export default function Template1() {
  const {selectedDoctor} = useSelector(appState);
  return (
 <div style={{
   height:'100%',
    overflow:'hidden'
 }}>
       <div className="template-1">
      <div className="flex-container">
        <div className="flex-row flex-left">
          <div className="candle-box">
            <span className="candle"></span>
            <span className="candle"></span>
            <span className="candle"></span>
            <span className="candle"></span>
            <span className="candle"></span>
            <span className="candle"></span>
          </div>
          <img
            src={selectedDoctor?.avatar || "https://i.pravatar.cc/500?img=31"}
            alt="..."
            className="profile"
          />
        </div>
        <div className="flex-row flex-right">
          <img
            className="logo"
            src={selectedDoctor?.logo || "https://cdn.prod.website-files.com/65507ecfa46449066286d9c4/65e5b8f2f87da77dd60b20c8_FCG-Logo-2024.png"}
          />
          <div className="content">
            <div className="heading">
              <h4>{selectedDoctor?.name?.en || "Dr. Amina Bout"}</h4>
              <h4>{selectedDoctor?.name?.ar || "الدكتورة أمينة بوت"}</h4>
            </div>
            <span className="divider"/>
            <div className="body">
                <h6>{selectedDoctor?.speciality?.en || "Obstetrics and Gynecology"}</h6>
                <h6>{selectedDoctor?.speciality?.ar ||  "طب التوليد وأمراض النساء"}</h6>
            </div>
          </div>
          <span className="highligter"></span>
        </div>
      </div>
    </div>
 </div>
  );
}
