## รายงานข้อมูล COVID-19 ในประเทศไทย  
ระบบติดตามและรายงานข้อมูลการระบาดและการฉีดวัคซีน COVID-19 ในประเทศไทย  

![bot-taks-scheduler](https://github.com/porames/the-researcher-covid-bot/workflows/bot-taks-scheduler/badge.svg)  
ระบบตรวจสอบข้อมูลใหม่ทุกวัน เวลา 13:00 น. และ 19.00 น. [Github Actions](https://github.com/porames/the-researcher-covid-bot/blob/master/.github/workflows/covid-scheduled-bot.yaml)  

ตัวเว็บไซต์พัฒนาโดย JavaScript + NextJS, แสดงผลข้อมูลในรูปแบบกราฟโดยใช้ [d3](https://d3js.org), [visx](https://github.com/airbnb/visx/) และ [Matplotlib](https://matplotlib.org), แสดงผลข้อมูลในรูปแบบแผนที่โดยใช้ [Mapbox](https://mapbox.com)
ตัวประมวลผลข้อมูลใช้ NodeJS และ Python

### ดาวน์โหลดชุดข้อมูล (Beta)
เนื่องจากเว็บไซต์อยู่ระหว่างการพัฒนา รูปแบบชุดข้อมูลจึงอาจมีการเปลี่ยนแปลงได้ในอนาคต  
ระบบจะตรวจสอบการอัพเดทจากชุดข้อมูลหน่วยงานทุกเที่ยงวัน อย่างไรก็ตามความถี่การอัพเดทข้อมูลจากหน่วยงานมีความไม่แน่นอน 🤦‍♂️
- [ข้อมูลการฉีดวัคซีนระดับประเทศ รายวัน](https://github.com/porames/the-researcher-covid-bot/blob/master/components/gis/data/national-vaccination-timeseries.json)
- [ข้อมูลการฉีดวัคซีนรายจังหวัด](https://github.com/porames/the-researcher-covid-bot/blob/master/components/gis/data/provincial-vaccination-data_2.json)
- [ข้อมูล Supply วัคซีนแต่ละศูนย์บริการวัคซีน](https://raw.githubusercontent.com/porames/the-researcher-covid-bot/master/components/gis/data/hospital-vaccination-data.json) (Archived ไม่สามารถอัพเดทได้เนื่องจากฐานข้อมูลถูกปิดการเข้าถึง)
- [ข้อมูลการฉีดวัคซีนแยกตามผู้ผลิต](https://github.com/porames/the-researcher-covid-bot/blob/master/components/gis/data/vaccine-manufacturer-timeseries.json)
- [ข้อมูลการตรวจเชื้อรายวัน](https://github.com/porames/the-researcher-covid-bot/blob/master/components/gis/data/testing-data.json) ข้อมูลอัพเดทรายสัปดาห์ (มั้ง)

### หลักการประมวลผลข้อมูล
- **ค่าเฉลี่ยช่วง 7 วัน (7-day Moving Average)** คือค่าเฉลี่ยของข้อมูลในช่วงเวลาหนึ่งย้อนหลังไปอีก  6 วัน ทำให้เห็นแนวโน้มของการเปลี่ยนแปลงข้อมูลมีความแปรปรวน
- **อัตราการเปลี่ยนแปลงในช่วง 14 วัน** ร้อยละการเปลี่ยนแปลงของค่าเฉลี่ย 7 วันล่าสุด กับค่าเฉลี่ย 7 วันของเมื่อ 14 วันก่อน
- **ร้อยละความครอบคลุมวัคซีนรายจังหวัด** = `จำนวนโดสที่ฉีดในจังหวัด/(2*จำนวนประชากร) * 100%`

### ที่มาข้อมูล
- ข้อมูลตำแหน่งที่พบผู้ป่วยประจำวันจาก [กรมควบคุมโรค กระทรวงสาธารณสุข](https://data.go.th/dataset/covid-19-daily)
- ข้อมูลจำนวนผู้ป่วยรายวันจาก [ทำเนียบรัฐบาล](https://www.thaigov.go.th/news/contents/details/29299) ประมวลผลโดยคุณ [Dylan Jay](https://github.com/djay/covidthailand)
- ข้อมูลการตรวจเชื้อรายวันจาก [กรมวิทยาศาสตร์การแพทย์ กระทรวงสาธารณสุข](http://data.go.th/dataset/covid-19-testing-data)
- ข้อมูลจำนวนการฉีดวัคซีนรายวันจาก [รายงานการฉีดวัคซีนประจำวัน กรมควบคุมโรค กระทรวงสาธารณสุข]() ประมวลผลจาก PDF โดยคุณ [Dylan Jay](https://github.com/djay/covidthailand)
- ข้อมูลการฉีดวัคซีนรายจังหวัดและรายศูนย์ให้บริการฉีดวัคซีนจาก [ระบบติดตามตรวจสอบย้อนกลับโซ่ความเย็นวัคซีนโควิด-19](https://datastudio.google.com/u/0/reporting/731713b6-a3c4-4766-ab9d-a6502a4e7dd6/page/JMn3B) มหาวิทยาลัยมหิดล (โดนสั่งปิดไปแล้ว)
- จำนวนประชากรแต่ละจังหวัดแยกตามกลุ่มอายุ อ้างอิงจาก[สถิติประชากรศาสตร์](http://statbbi.nso.go.th/staticreport/page/sector/th/01.aspx) สำนักงานสถิติแห่งชาติ รายงานสำรวจล่าสุดเมื่อปี พ.ศ. 2563
