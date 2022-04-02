import React, { useState } from "react";
import { Calendar as CalendarComponent } from "react-calendar";
import { Calendar } from "antd";

function CalendarDashboard() {
  const [value, onChange] = useState(new Date());

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  return (
    // <div className="bg-white py-8 px-3 mt-8 rounded">
    //   {/* <CalendarComponent onChange={onChange} value={value} /> */}
    // </div>
    <div className="rounded border ">
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
}

export default CalendarDashboard;
