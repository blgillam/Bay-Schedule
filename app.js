const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

// ── INLINE SVG ICONS (Lucide icon paths, MIT license) ──
function Icon({
  size = 14,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "inline-block",
      verticalAlign: "middle",
      flexShrink: 0,
      ...(style || {})
    }
  }, children);
}
const Search = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m21 21-4.3-4.3"
}));
const Plus = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14M12 5v14"
}));
const Download = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 10 12 15 17 10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "15",
  x2: "12",
  y2: "3"
}));
const Trash2 = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "10",
  y1: "11",
  x2: "10",
  y2: "17"
}), /*#__PURE__*/React.createElement("line", {
  x1: "14",
  y1: "11",
  x2: "14",
  y2: "17"
}));
const X = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M18 6 6 18M6 6l12 12"
}));
const AlertCircle = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "8",
  x2: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "16",
  x2: "12.01",
  y2: "16"
}));
const Check = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
const ChevronLeft = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "15 18 9 12 15 6"
}));
const ChevronRight = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "9 18 15 12 9 6"
}));
const RefreshCw = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 12a9 9 0 0 1 15-6.7L21 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 3v5h-5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 12a9 9 0 0 1-15 6.7L3 16"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 21v-5h5"
}));

// ── INITIAL SEED DATA (imported from mission_division_schedule__2_.html) ──
const SEED_JOBS = [{
  "date": "04/23/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "46355140",
  "notes": "RESAG WIRE, WORKING W/PM",
  "addr": "37.492693,-121.829774",
  "tc": "YES 0800",
  "notif": "103437389",
  "outage": "NTO 0830-1500",
  "circuit": "26-0033512",
  "permit": "Permit#8979 24hr pg&e@acpwa.org 510-670-5450 BG EMAILED 4/17",
  "scope": "RESAG WIRE, WORKING W/PM 46355888 NOTI/128302955 TO REPAIR TIE WIRE, CLIMBER ON BAKER BOARDS IN FIELD",
  "gps": "37.492693, -121.829774",
  "flag": ""
}, {
  "date": "04/23/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "46355888",
  "notes": "BUNDLED W/PM 46355140",
  "addr": "37.491516,-121.831221",
  "tc": "YES",
  "notif": "103159012",
  "outage": "NTO 0830-1500",
  "circuit": "26-0033512",
  "permit": "",
  "scope": "REPAIR TIE WIRE, BAKER BOARDS",
  "gps": "37.491516, -121.831221",
  "flag": ""
}, {
  "date": "04/23/26",
  "day": "Thu",
  "crew": "SAL",
  "wo": "35598135",
  "notes": "",
  "addr": "1828 LEO LN, CONCORD",
  "tc": "YES 0800",
  "notif": "",
  "outage": "TXO 0900-1300",
  "circuit": "26-0037281",
  "permit": "",
  "scope": "INSTALL NEW 750AL UG SVC, REMOVE EXISTING",
  "gps": "37.9788, -122.0310",
  "flag": ""
}, {
  "date": "04/23/26",
  "day": "Thu",
  "crew": "PAR",
  "wo": "35655749",
  "notes": "SPIDER/DONAHOO FROM 04-10-26 | DONAHOO TO PRE-DIG",
  "addr": "12563 FOOTHILL RD, SUNOL",
  "tc": "YES 0800/DONAHOO",
  "notif": "2026040202913-000 / 2026040202925-000",
  "notifDate": "04/06/26",
  "expDate": "04/30/26",
  "outage": "EOL 0830-1500",
  "circuit": "26-0042374",
  "poleInfo": "45-3 ERTC 8/25/2027",
  "permit": "",
  "scope": "REPLACE POLE, WITH SPIDER, CORNER POLE, SINGLE PHASE, 2 DOWN GUYS",
  "gps": "37.5073, -121.8726",
  "flag": "LOCKDOWN"
}, {
  "date": "04/23/26",
  "day": "Thu",
  "crew": "UECCO",
  "wo": "35606835",
  "notes": "Civil not finished",
  "addr": "38801 BLUEGRASS CT, NEWARK",
  "tc": "",
  "notif": "",
  "outage": "CLR 0830-1630",
  "circuit": "",
  "permit": "",
  "scope": "TO REPLACE T-1611 FROM 50KV TO 167KV - UPGRADE 3 RUNS OF SECONDARY & 1 SERVICE",
  "gps": "37.5218, -122.0432",
  "flag": "CANCELLED"
}, {
  "date": "04/23/26",
  "day": "Thu",
  "crew": "UECCO",
  "wo": "35693218",
  "notes": "BACK TO PAR",
  "addr": "714 WASATCH DR, FREMONT",
  "tc": "",
  "notif": "",
  "outage": "EOL 0830-1630",
  "circuit": "26-0039964/26-0039966",
  "permit": "",
  "scope": "REPLACE POLE 45' TO 50'/2. INSTALL CGC 100000297588 (100KVA). UPGRADE SERVICE (1/0AL TPX)",
  "gps": "37.5384, -121.9734",
  "flag": ""
}, {
  "date": "04/24/26",
  "day": "Fri",
  "crew": "BRIAN",
  "wo": "35554021",
  "notes": "105' BUCKET NEEDED \u2014 GET W/ JAROD",
  "addr": "2015 DORNE PL, FREMONT",
  "tc": "YES 0800",
  "notif": "NO",
  "outage": "TXO 0900-1400",
  "circuit": "26-0038326",
  "permit": "ENC2025-01241 48HR/7-6-26 510-494-4724 BG EMAILED 4/21",
  "scope": "WILL NEED 105' BUCKET",
  "gps": "37.5172, -121.9534",
  "flag": ""
}, {
  "date": "04/24/26",
  "day": "Fri",
  "crew": "SAL",
  "wo": "35597965",
  "notes": "GC CIVIL REPLACING BOXES 04-01",
  "addr": "3857 LA VISTA CT, CONCORD",
  "tc": "YES 0830",
  "notif": "NO",
  "outage": "TXO 0900-1500",
  "circuit": "26-0041392",
  "permit": "BG EMAILED 4/21",
  "scope": "TXO REPLACE EXISTING SECONDARY WITH 750AL, INSTALL NEW 4/0AL UG SVC",
  "gps": "37.9521, -122.0121",
  "flag": ""
}, {
  "date": "04/24/26",
  "day": "Fri",
  "crew": "PAR",
  "wo": "35681858",
  "notes": "",
  "addr": "636 DOUGLAS DR, SAN LEANDRO",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026041702036-000",
  "notifDate": "04/21/26",
  "expDate": "05/15/26",
  "outage": "TXO NTO 0830-1500",
  "circuit": "26-0042579/26-0042574",
  "permit": "Permit# EUNEWSV-25-0007 24HR/5/26/2026 ETINSPECTIONS@SANLEANDRO.ORG 510-577-3308",
  "scope": "",
  "gps": "37.7217, -122.1562",
  "flag": "LOCKDOWN"
}, {
  "date": "04/24/26",
  "day": "Fri",
  "crew": "UECCO",
  "wo": "35674417",
  "notes": "",
  "addr": "5415 BROPHY DR, FREMONT",
  "tc": "",
  "notif": "",
  "outage": "EOL 0830-1730",
  "circuit": "26-0040283/26-0040267/26-0040271",
  "permit": "",
  "scope": "REPLACE POLE (35'-45'/2) & CGC. REPLACE POLE (30'-45'/2) & INSTALL CGC. EXTEND PRIMARY 1 SPAN. REPLACE 8 SERVICES",
  "gps": "37.5621, -121.9873",
  "flag": ""
}, {
  "date": "04/25/26",
  "day": "Sat",
  "crew": "BRIAN",
  "wo": "35455859",
  "notes": "VAC/UECCO FROM 02-21",
  "addr": "1200 MESA ST, CONCORD",
  "tc": "YES 0800",
  "notif": "2026041602855-000",
  "notifDate": "04/20/26",
  "expDate": "05/14/26",
  "outage": "CLR/NTO 0830-1700",
  "circuit": "26-0024374/26-0024371 (SW LOG NEEDED)",
  "poleInfo": "55-H1",
  "permit": "UTIL26023 24HR/5-16-26 925-671-3066 CD.INSPECTIONSCHEDULER@CITYOFCONCORD.ORG",
  "scope": "CUT/KICK RISER POLE, INSTALL 900 AMP HOOK SWITCH",
  "gps": "37.9637, -122.0326",
  "flag": ""
}, {
  "date": "04/26/26",
  "day": "Sun",
  "crew": "BRIAN/SAL",
  "wo": "35385951",
  "notes": "UECCO/RING/TURNM",
  "addr": "LATHROP/VIERRA JOB",
  "tc": "",
  "notif": "",
  "outage": "CLR 0830-1600",
  "circuit": "SENT 04-16",
  "permit": "",
  "scope": "",
  "gps": "37.8224, -121.2784",
  "flag": ""
}, {
  "date": "04/27/26",
  "day": "Mon",
  "crew": "BRIAN",
  "wo": "35641382",
  "notes": "VAC UECCO FROM 02-18",
  "addr": "33853 10TH ST, UNION CITY LOC 1",
  "tc": "YES 0800 NO PARKS",
  "notif": "",
  "outage": "NTO/TXO 0830-1600",
  "circuit": "SENT 04-01",
  "poleInfo": "55/1",
  "permit": "PERMIT# ENCR 25-259 24HR/5-5-26 510-602-5246",
  "scope": "MOVING NEW POLE, 715 AL PRIMARY, INSTALL ALLEY ARM, NEW TX & 7/32 MESSENGER MID SPAN",
  "gps": "37.5954, -122.0198",
  "flag": ""
}, {
  "date": "04/27/26",
  "day": "Mon",
  "crew": "SAL",
  "wo": "35641382",
  "notes": "FROM 02-18 | NEED PWR SAFETY F/U W/ CITY INSPECTOR FOR TCP",
  "addr": "33853 10TH ST, UNION CITY LOC 2 & 3",
  "tc": "YES",
  "notif": "",
  "outage": "W/BRIAN",
  "circuit": "55-1",
  "permit": "PERMIT# ENCR 25-259 24HR/5-5-26 510-602-5246",
  "scope": "REPLACE SHS, DDE 3PH, 715 AL PRIMARY",
  "gps": "37.5954, -122.0198",
  "flag": ""
}, {
  "date": "04/27/26",
  "day": "Mon",
  "crew": "PAR",
  "wo": "35678138",
  "notes": "UECCO/VAC FROM 05-27",
  "addr": "1929 LINDWOOD WAY, SAN LEANDRO",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026042202292-000",
  "notifDate": "04/24/26",
  "expDate": "05/20/26",
  "outage": "EOL 0830-1430",
  "circuit": "SENT 04-13",
  "poleInfo": "50-3 25KVA/M262567",
  "permit": "PERMIT# EUPOLE-25-0011 24HR/4/28/2026 ETINSPECTIONS.ORG 510-577-3308",
  "scope": "REPLACE POLE, UPGRADE TX, NEW GRD GRID, REPL MULTIPLE OH SVC, CUT IN SEC BREAKS AND LEAVE THEM, CUT AND PATCH CONCRETE",
  "gps": "37.7312, -122.1498",
  "flag": "LOCKDOWN"
}, {
  "date": "04/27/26",
  "day": "Mon",
  "crew": "UECCO",
  "wo": "35677334",
  "notes": "",
  "addr": "5115 RAHLVES DR, CASTRO VALLEY",
  "tc": "",
  "notif": "",
  "outage": "OTR-NTF 0830-1730",
  "circuit": "26-0043280/26-0043283",
  "permit": "",
  "scope": "REPLACE POLE 1 SPAN SOUTH OF CGC 0022-9319 FROM 45' TO 50'/1. INSTALL CGC 1000002-94405 (25KV). REPLACE 5 SERVICES",
  "gps": "37.6931, -122.0654",
  "flag": ""
}, {
  "date": "04/28/26",
  "day": "Tue",
  "crew": "BRIAN",
  "wo": "35659254",
  "notes": "UECCO PREDIG/CRANE | WILL NEED TO MAKE PRIMARY HOT SOONER",
  "addr": "38666 BELOIT ST, FREMONT",
  "tc": "YES 3-MAN TC 0800 NO PARKS",
  "notif": "2026042202579-000",
  "notifDate": "04/24/26",
  "expDate": "05/20/26",
  "outage": "EOL 0830-1700",
  "circuit": "SENT 04-01",
  "permit": "Permit# ENC2026-00636 48HR/2/19/2027 510-494-4717 FALVARADO@FREMONT.GOV",
  "scope": "",
  "gps": "37.5712, -122.0543",
  "flag": ""
}, {
  "date": "04/28/26",
  "day": "Tue",
  "crew": "SAL",
  "wo": "35659254",
  "notes": "UECCO PREDIG/CRANE",
  "addr": "38666 BELOIT ST, FREMONT",
  "tc": "YES",
  "notif": "2026042202579-000",
  "notifDate": "04/24/26",
  "expDate": "05/20/26",
  "outage": "W/BRIAN",
  "circuit": "",
  "permit": "Permit# ENC2026-00636",
  "scope": "",
  "gps": "37.5712, -122.0543",
  "flag": ""
}, {
  "date": "04/28/26",
  "day": "Tue",
  "crew": "PAR",
  "wo": "35659254",
  "notes": "",
  "addr": "38666 BELOIT ST, FREMONT",
  "tc": "",
  "notif": "",
  "outage": "W/BRIAN",
  "circuit": "",
  "permit": "Permit# ENC2026-00636",
  "scope": "",
  "gps": "37.5712, -122.0543",
  "flag": ""
}, {
  "date": "04/28/26",
  "day": "Tue",
  "crew": "UECCO",
  "wo": "35677334",
  "notes": "",
  "addr": "RAY AVE & CENTER ST, CASTRO VALLEY",
  "tc": "",
  "notif": "",
  "outage": "OTR-NTF 0830-1730",
  "circuit": "26-0043289/26-0043291",
  "permit": "",
  "scope": "INSTALL CGC 1000002-93422 (25KV) 1 SPAN SOUTH OF CGC 4865-4401. REPLACE 5 SERVICES. LOC 3: REPLACE 2 SERVICES AT 5115 & 5123 RAHLVES DR",
  "gps": "37.6931, -122.0654",
  "flag": ""
}, {
  "date": "04/29/26",
  "day": "Wed",
  "crew": "BRIAN",
  "wo": "35647579",
  "notes": "VAC UECCO FROM 3-30",
  "addr": "1671 NEWELL AVE, WALNUT CREEK",
  "tc": "YES 0830 NO PARKS",
  "notif": "2026042202648-000",
  "notifDate": "04/24/26",
  "expDate": "05/20/26",
  "outage": "NTO/EOL 0900-1830",
  "circuit": "SENT 04-02",
  "permit": "PERMIT# PWEP25-01089 48HR/3-31-26 925-595-5992 ERIC.SANDERS@pw.cccounty.us",
  "scope": "CUT KICK POLE, NEW TX, SERVICE & AWAC",
  "gps": "37.9054, -122.0643",
  "flag": ""
}, {
  "date": "04/29/26",
  "day": "Wed",
  "crew": "SAL",
  "wo": "35525731",
  "notes": "UECCO/VAC",
  "addr": "27689 TYRRELL AVE, HAYWARD",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "NTO/CLR/TXO/NE 0830-1700",
  "circuit": "SENT 04-02",
  "permit": "PERMIT# EN-25-0200 24HR/9/15/2026 510-583-4730",
  "scope": "REPLACE POLE, RISER, TERM LB ELBOWS, POTHEADS",
  "gps": "37.6512, -122.0834",
  "flag": ""
}, {
  "date": "04/29/26",
  "day": "Wed",
  "crew": "PAR",
  "wo": "35684333",
  "notes": "FROM 05-08 | Extended to 7/29/26",
  "addr": "2140 WEST 135TH, SAN LEANDRO",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "NTO/TXO 0830-1400",
  "circuit": "SENT 04-03",
  "permit": "",
  "scope": "INSTALL NEW SW, REMOVE OLD SW, INSTALL NEW TX, GRD GRID, 1 4/0AL OH SVC, REPLACE 3 1/0AL OH SVC'S",
  "gps": "37.6789, -122.1453",
  "flag": "LOCKDOWN"
}, {
  "date": "04/30/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "35641384",
  "notes": "",
  "addr": "TRIAD DRIVE EAST, LIVERMORE",
  "tc": "YES 0730",
  "notif": "NO",
  "outage": "TXO 0830-1130",
  "circuit": "26-0041267",
  "permit": "",
  "scope": "HOOK UP SECONDARY",
  "gps": "37.6821, -121.7765",
  "flag": ""
}, {
  "date": "04/30/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "35641518",
  "notes": "",
  "addr": "TRIAD DRIVE EAST, LIVERMORE",
  "tc": "NO",
  "notif": "NO",
  "outage": "TXO 0845-1130",
  "circuit": "26-0041290",
  "permit": "",
  "scope": "HOOK UP SECONDARY",
  "gps": "37.6821, -121.7772",
  "flag": ""
}, {
  "date": "04/30/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "35641519",
  "notes": "",
  "addr": "TRIAD DRIVE EAST, LIVERMORE",
  "tc": "NO",
  "notif": "NO",
  "outage": "TXO 0900-1130",
  "circuit": "SENT 04-16",
  "permit": "",
  "scope": "HOOK UP SECONDARY",
  "gps": "37.6821, -121.7779",
  "flag": ""
}, {
  "date": "04/30/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "35335169",
  "notes": "",
  "addr": "950 DESCONSADO AVE, LIVERMORE",
  "tc": "YES 0800 NO PARKS",
  "notif": "NO",
  "outage": "TXO 1200-1500",
  "circuit": "SENT 04-03",
  "permit": "PERMIT# EN250700 24HR/5/24/2026 925-960-4500",
  "scope": "REMOVE EXISTING SEC & SVC, INSTALL 350AL & 4/0AL SEC & SVC",
  "gps": "37.6754, -121.8312",
  "flag": ""
}, {
  "date": "04/30/26",
  "day": "Thu",
  "crew": "SAL",
  "wo": "35678183",
  "notes": "UECCO/VAC PULLED PENDING PGE",
  "addr": "22807 FILBERT ST, HAYWARD",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "CLR 0830-1530",
  "circuit": "SENT 04-07",
  "permit": "PERMIT# EN-26-0087 24HR/8/16/2026 510-583-4730",
  "scope": "REPLACE 3PH RISER POLE, SAME HOLE SET",
  "gps": "37.6589, -122.0912",
  "flag": ""
}, {
  "date": "04/30/26",
  "day": "Thu",
  "crew": "PAR",
  "wo": "35675795",
  "notes": "UECCO/VAC",
  "addr": "4341 LAWRENCE DR, CASTRO VALLEY",
  "tc": "YES NO PARKS 0800",
  "notif": "YES",
  "outage": "POD/NTO 0830-1500",
  "circuit": "SENT 04-13",
  "permit": "PERMIT# 11910 24HR/3/23/2027 510-670-5450 PG&E@ACPWA.ORG",
  "scope": "",
  "gps": "37.6934, -122.0684",
  "flag": "LOCKDOWN"
}, {
  "date": "04/30/26",
  "day": "Thu",
  "crew": "SAL",
  "wo": "35297074",
  "notes": "UECCO/VAC LOC 3",
  "addr": "22521 6TH ST, HAYWARD LOC 3",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "EOL 0830-1530",
  "circuit": "SENT 03-10",
  "poleInfo": "50-3 50KVS/M260054",
  "permit": "",
  "scope": "REPLACE POLE, INSTALL NEW TX, GROUND GRID, MULTIPLE OH SVC'S",
  "gps": "37.6601, -122.0834",
  "flag": ""
}, {
  "date": "04/30/26",
  "day": "Thu",
  "crew": "UECCO",
  "wo": "35520350",
  "notes": "MOVED TO 5/1",
  "addr": "1608 GOLDEN RAIN RD, WALNUT CREEK",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.9043, -122.0521",
  "flag": "MOVED"
}, {
  "date": "05/01/26",
  "day": "Fri",
  "crew": "BRIAN",
  "wo": "35653846",
  "notes": "UECCO/VAC FROM 04-22",
  "addr": "887 ELGIN ST, SAN LORENZO",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026041602763-000",
  "notifDate": "04/20/26",
  "expDate": "05/14/26",
  "outage": "NTO/TXO 0830-1530",
  "circuit": "SENT 04-22",
  "poleInfo": "50-3 50KVA/M260138",
  "permit": "PERMIT# 11661 24HR/4/24/2026 510-670-5450 BG EMAILED 4/17",
  "scope": "CUTKICK POLE, UPGRADE TX",
  "gps": "37.6812, -122.1189",
  "flag": "LOCKDOWN"
}, {
  "date": "05/01/26",
  "day": "Fri",
  "crew": "BRIAN",
  "wo": "35255728",
  "notes": "MOVED TO 05-20",
  "addr": "1450 BOLLINGER CANYON RD, MORAGA",
  "tc": "NO",
  "notif": "YES LOC 1",
  "outage": "NTO/NE 0830-1230",
  "circuit": "SENT 04-01",
  "permit": "",
  "scope": "",
  "gps": "37.8248, -122.0646",
  "flag": "MOVED"
}, {
  "date": "05/01/26",
  "day": "Fri",
  "crew": "SAL",
  "wo": "35698605",
  "notes": "",
  "addr": "24787 FAIRVIEW AVE, HAYWARD",
  "tc": "YES",
  "notif": "YES",
  "outage": "0830-1500",
  "circuit": "SENT 04-14",
  "permit": "PERMIT# 11909 24HR/3/23/2027 PG&E@ACPWA.ORG 510-670-5450",
  "scope": "",
  "gps": "37.6723, -122.0834",
  "flag": "LOCKDOWN"
}, {
  "date": "05/01/26",
  "day": "Fri",
  "crew": "PAR",
  "wo": "35700981",
  "notes": "UECCO/VAC",
  "addr": "24760 TOWNSEND AVE, HAYWARD",
  "tc": "YES",
  "notif": "YES",
  "outage": "0830-1500",
  "circuit": "SENT 04-14",
  "permit": "PERMIT# EN-26-0129 24HR/9/12/2026 510-583-4730",
  "scope": "",
  "gps": "37.6701, -122.0867",
  "flag": "LOCKDOWN"
}, {
  "date": "05/01/26",
  "day": "Fri",
  "crew": "UECCO",
  "wo": "35655902",
  "notes": "CUST NOT READY",
  "addr": "4559 EDWARDS LN, CASTRO VALLEY",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "NTO/EOL 0800-1430",
  "circuit": "SENT 04-02",
  "permit": "",
  "scope": "REPLACE POLE, INSTALL NEW TX, GRD GRID, ANCHOR, NEW OH SVC, CUT IN SEC BREAKS",
  "gps": "37.6941, -122.0658",
  "flag": ""
}, {
  "date": "05/02/26",
  "day": "Sat",
  "crew": "SAL",
  "wo": "35496779",
  "notes": "UECCO/VAC RESCINDED 3/17",
  "addr": "67 BROOKWOOD RD, ORINDA",
  "tc": "YES 0800",
  "notif": "YES X2",
  "outage": "EOL 0830-1530",
  "circuit": "SENT 03-16",
  "poleInfo": "45-4 & 40-5",
  "permit": "",
  "scope": "REPLACE 3PH POLE, INSTALL NEW SPAN GUY POLE AT LOC 2, #6CU HAS MULTIPLE BUMPS IN WIRE",
  "gps": "37.8812, -122.1854",
  "flag": ""
}, {
  "date": "05/04/26",
  "day": "Mon",
  "crew": "BRIAN",
  "wo": "35654190",
  "notes": "VAC/UECCO FROM 04-01 | CUT IN SEC BREAKERS FIRST",
  "addr": "27429 CORONADO WAY, HAYWARD LOC 2,3,4",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026032703951-001",
  "notifDate": "04/01/26",
  "expDate": "05/20/26",
  "outage": "NTO/POD 0830-1600",
  "circuit": "26-0040444 POD RECEIVED",
  "poleInfo": "50-4 25KVA SS/M260405",
  "permit": "PERMIT# EN-25-0674 48HR/8/31/2026 510-583-4796",
  "scope": "SBS POLE AT LOC 3, INSTALL NEW ANCHOR, CUT IN SEC BREAKERS AT LOC 2 & 4, INSTALL NEW SVC AT LOC 1 & 9",
  "gps": "37.6587, -122.0978",
  "flag": ""
}, {
  "date": "05/04/26",
  "day": "Mon",
  "crew": "SAL",
  "wo": "35654190",
  "notes": "FROM 4-01 | CUT IN SEC BREAKERS FIRST",
  "addr": "27429 CORONADO WAY, HAYWARD LOC 6,7",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026042202267-000",
  "notifDate": "04/24/26",
  "expDate": "05/20/26",
  "outage": "NTO/POD 0830-1600",
  "circuit": "26-0040444 POD RECEIVED",
  "poleInfo": "50-4 15KVA SS/M260404",
  "permit": "PERMIT# EN-25-0674 48HR/8/31/2026 510-583-4796",
  "scope": "CUT/KICK POLE LOC 6, INSTALL NEW TX, ANCHOR AND SEC BREAKERS AT LOC 6 & 7",
  "gps": "37.6587, -122.0978",
  "flag": ""
}, {
  "date": "05/05/26",
  "day": "Tue",
  "crew": "BRIAN",
  "wo": "35659740",
  "notes": "",
  "addr": "5704 OLEANDER DR, NEWARK",
  "tc": "YES 0800 NO PARKS",
  "notif": "NO",
  "outage": "TXO 0830-1100",
  "circuit": "SENT 04-17",
  "permit": "PERMIT# ENCP2025-0237 24HR/7/12/2026 510-409-1425",
  "scope": "INSTALL 4/0AL UG SVC, REPLACE SQUIDS",
  "gps": "37.5312, -122.0412",
  "flag": ""
}, {
  "date": "05/05/26",
  "day": "Tue",
  "crew": "SAL",
  "wo": "35700240",
  "notes": "",
  "addr": "14771 WILEY ST, SAN LEANDRO",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026042000639-000",
  "notifDate": "04/22/26",
  "expDate": "05/18/26",
  "outage": "POD/NTO 0830-1330",
  "circuit": "SENT 04-17",
  "permit": "",
  "scope": "INSTALL NEW TX, GRD GRID, REFRAME PRIMARY AND SEC ARM, REPLACE 5 OH SVC'S, INSTALL ONE NEW ONE, CUT IN SECONDARY BREAKS",
  "gps": "37.7189, -122.1456",
  "flag": ""
}, {
  "date": "05/05/26",
  "day": "Tue",
  "crew": "",
  "wo": "35123832",
  "notes": "UECCO/VAC DOUBLE CIRCUIT HOTWORK \u2014 WAITING ON PGE",
  "addr": "918 ESTUDILLO AVE, SAN LEANDRO",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "NTO/NE/POD 0830-1630",
  "circuit": "SENT 04-03",
  "permit": "",
  "scope": "REPLACE POLE, INSTALL NEW 900 AMP SWITCH",
  "gps": "37.7245, -122.1567",
  "flag": "WAITING"
}, {
  "date": "05/06/26",
  "day": "Wed",
  "crew": "BRIAN",
  "wo": "35522642",
  "notes": "UECCO/VAC MOTCO NAVAL BASE | RAILROAD FLAGGERS REQUIRED",
  "addr": "38.040110,-122.030067 PORT CHICAGO HWY",
  "tc": "YES 0800",
  "notif": "YES",
  "outage": "NTO/NE/OTHER 0900-1600",
  "circuit": "SENT 04-03",
  "permit": "ERTC 3/22/2027",
  "scope": "REPLACE POLE, REMOVE AND INSTALL NEW CAP BANK",
  "gps": "38.040110, -122.030067",
  "flag": ""
}, {
  "date": "05/06/26",
  "day": "Wed",
  "crew": "SAL",
  "wo": "35646605",
  "notes": "CRANE/PRE-DIG",
  "addr": "2 CHARLES HILL LN, ORINDA",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "EOL 0830-1500",
  "circuit": "SENT 04-02",
  "poleInfo": "45-4",
  "permit": "PERMIT# 25-008 48HR/2-8-26 925-253-4236 TFIERNER@CITYOFORINDA.ORG",
  "scope": "CRANE SET ON SOULE RD, SINGLE PHASE TANG, HOLE PREDUG BY LINDCO",
  "gps": "37.8823, -122.1834",
  "flag": ""
}, {
  "date": "05/06/26",
  "day": "Wed",
  "crew": "UECCO",
  "wo": "35662021",
  "notes": "",
  "addr": "1183 RALEIGH PL, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "NTO-EOL 0830-1730",
  "circuit": "",
  "permit": "",
  "scope": "CREW TO REPLACE PRIMARY POLE LOC.5 AND LOC.3, ADDING 50KVA TX",
  "gps": "37.6634, -122.0823",
  "flag": ""
}, {
  "date": "05/07/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "35655810",
  "notes": "UECCO VAC REMOVED 2/9 P/MAX GREENE | DO NOT DO LOC 6",
  "addr": "341 OXFORD ST, HAYWARD LOC 5,4",
  "tc": "YES 0800 3-MAN NO PARKS",
  "notif": "YES",
  "outage": "EOL 0830-1530",
  "circuit": "SENT 04-02",
  "poleInfo": "50-3 25KVA/M260405",
  "permit": "PERMIT# 11707 24HR/11/10/2026 PG&E@ACPWA.ORG 510-670-5450",
  "scope": "REPLACE POLE, INSTALL AWAC, SPAN GUY, MID-SPAN SVC, REPLACE MULTIPLE OH SVC'S",
  "gps": "37.6623, -122.0889",
  "flag": ""
}, {
  "date": "05/07/26",
  "day": "Thu",
  "crew": "SAL",
  "wo": "35655810",
  "notes": "",
  "addr": "341 OXFORD ST, HAYWARD LOC 1,2,3",
  "tc": "YES",
  "notif": "YES",
  "outage": "W/CALDERON",
  "circuit": "26-0017978",
  "permit": "PERMIT# 11707 24HR/11/10/2026",
  "scope": "REFRAME 2 POLES, INSTALL AWAC, SPAN GUY, REPLACE MULTIPLE OH SVC'S",
  "gps": "37.6623, -122.0889",
  "flag": ""
}, {
  "date": "05/07/26",
  "day": "Thu",
  "crew": "UECCO",
  "wo": "35662021",
  "notes": "",
  "addr": "1183 RALEIGH PL, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "NTO-EOL 0830-1730",
  "circuit": "",
  "permit": "",
  "scope": "DE-ENERGIZE CGC 3154208-41794 TO REPLACE POLE AT LOC.1. REPLACE EXISTING TX WITH 100KVA",
  "gps": "37.6634, -122.0823",
  "flag": ""
}, {
  "date": "05/08/26",
  "day": "Fri",
  "crew": "BRIAN",
  "wo": "35533997",
  "notes": "UECCO/VAC",
  "addr": "1055 LOS ARABIS LN, LAFAYETTE",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "EOL 0830-1600",
  "circuit": "SENT 04-10",
  "poleInfo": "50-3 50KVA/M260138",
  "permit": "",
  "scope": "REPLACE POLE FOR BETTERMENT, CUSTOMER NOT READY FOR ND PORTION",
  "gps": "37.8854, -122.1198",
  "flag": ""
}, {
  "date": "05/08/26",
  "day": "Fri",
  "crew": "SAL",
  "wo": "35659253",
  "notes": "",
  "addr": "1455 SAN JOSE ST, SAN LEANDRO",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "NTO/NE/POD 0830-1330",
  "circuit": "SENT 04-03",
  "permit": "PERMIT# EUNEWSV-25-0006 24HR/5/13/2026 ETINSPECTIONS@SANLEANDRO.ORG 510-577-3308",
  "scope": "INSTALL NEW TX, GRD GRID, INSTALL SEC BREAKS, REMOVE SOME SEC BREAKS, INSTALL NEW OH SVC",
  "gps": "37.7231, -122.1589",
  "flag": ""
}, {
  "date": "05/08/26",
  "day": "Fri",
  "crew": "UECCO",
  "wo": "35695090",
  "notes": "NIGHTWORK",
  "addr": "2353 DAVIS AVE, HAYWARD (2200-MIDNIGHT)",
  "tc": "",
  "notif": "",
  "outage": "CLR 2200-MIDNIGHT",
  "circuit": "",
  "permit": "",
  "scope": "REPLACE POLE 1 SPAN NORTH OF 14514 (LOC 3) FROM 55' TO 60'/2",
  "gps": "37.6578, -122.0923",
  "flag": "NIGHTWORK"
}, {
  "date": "05/09/26",
  "day": "Sat",
  "crew": "SAL",
  "wo": "35705746",
  "notes": "UECCO/VAC FROM 04-09-26",
  "addr": "25684 SUBLETT DR, HAYWARD",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026040202813-000",
  "notifDate": "04/06/26",
  "expDate": "04/30/26",
  "outage": "EOL 0830-1500",
  "circuit": "SENT 04-17",
  "permit": "PERMIT# EN-26-0149 24HR/8/30/2026 510-583-4730",
  "scope": "REPLACE POLE, INSTALL NEW GROUND GRID, UPGRADE TX, INSTALL NEW OH SVC",
  "gps": "37.6512, -122.0867",
  "flag": ""
}, {
  "date": "05/09/26",
  "day": "Sat",
  "crew": "UECCO",
  "wo": "35695090",
  "notes": "NIGHTWORK",
  "addr": "2353 DAVIS AVE, HAYWARD (MIDNIGHT-0400)",
  "tc": "",
  "notif": "",
  "outage": "CLR MIDNIGHT-0400",
  "circuit": "",
  "permit": "",
  "scope": "REPLACE POLE 1 SPAN NORTH OF 14514 (LOC 3) FROM 55' TO 60'/2",
  "gps": "37.6578, -122.0923",
  "flag": "NIGHTWORK"
}, {
  "date": "05/11/26",
  "day": "Mon",
  "crew": "BRIAN",
  "wo": "35701682",
  "notes": "",
  "addr": "5875 ARNOLD RD, DUBLIN",
  "tc": "YES 0800",
  "notif": "NO",
  "outage": "CLR/NE 0830-1630",
  "circuit": "SENT 04-20",
  "permit": "",
  "scope": "INSTALL NEW SW/INT/SW",
  "gps": "37.7021, -121.9356",
  "flag": ""
}, {
  "date": "05/11/26",
  "day": "Mon",
  "crew": "SAL",
  "wo": "35521917",
  "notes": "UECCO/RING AND TURN",
  "addr": "34802 BEGONIA ST, UNION CITY",
  "tc": "YES 0800 NO PARKS",
  "notif": "UECCO",
  "outage": "CLR/NTO/NE 0830-1830",
  "circuit": "SENT 04-02",
  "permit": "PERMIT# ENCR24-221rev1 24HR/7/6/2026 510-602-5246",
  "scope": "UECCO TO ASSIST WITH RING AND TURN. REMOVE EXISTING PAD AND TX, INSTALL NEW TX AND PAD, INSTALL NEW SECONDARY AND SVC",
  "gps": "37.5934, -122.0256",
  "flag": ""
}, {
  "date": "05/12/26",
  "day": "Tue",
  "crew": "BRIAN",
  "wo": "35705133",
  "notes": "",
  "addr": "3330 GLOUCESTER PL, FREMONT",
  "tc": "YES 0800 NO PARKS",
  "notif": "NO",
  "outage": "TXO 0830-1030",
  "circuit": "SENT 04-21",
  "permit": "PERMIT# ENC2026-00947 48HR/6/18/2027 510-494-4717 FALVARADO@FREMONT.GOV",
  "scope": "PULL IN NEW UG SVC",
  "gps": "37.5178, -121.9612",
  "flag": ""
}, {
  "date": "05/12/26",
  "day": "Tue",
  "crew": "BRIAN",
  "wo": "35612034",
  "notes": "",
  "addr": "2210 CANYON OAK LN, DANVILLE",
  "tc": "YES FOLLOWING NO PARKS",
  "notif": "NO",
  "outage": "TXO 1230-1430",
  "circuit": "SENT 04-02",
  "permit": "",
  "scope": "PULL IN UG SVC",
  "gps": "37.8234, -122.0023",
  "flag": ""
}, {
  "date": "05/12/26",
  "day": "Tue",
  "crew": "SAL",
  "wo": "35647770",
  "notes": "",
  "addr": "3477 INVESTMENT, HAYWARD",
  "tc": "YES 0800",
  "notif": "NO",
  "outage": "NTO/NE 0830-1500",
  "circuit": "SENT 04-21",
  "permit": "PERMIT# EN-26-0129 24HR/9/12/2026 510-583-4730",
  "scope": "INSTALL NEW PD MT TX, PULL IN 210' OF 1/0AL PRIMARY, AND 1000AL UG SVC",
  "gps": "37.6612, -122.0834",
  "flag": ""
}, {
  "date": "05/13/26",
  "day": "Wed",
  "crew": "BRIAN",
  "wo": "35640662",
  "notes": "VAC UECCO FROM 04-22 | SEWER MAIN/VAC/PRE-DIG",
  "addr": "715 HAMILTON DR, PLEASANT HILL LOC 1",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026033002819-000",
  "notifDate": "04/02/26",
  "expDate": "04/27/26",
  "outage": "NTO/TXO 0830-1530",
  "circuit": "SENT 04-22",
  "permit": "PERMIT# ENC-25-0227 48HR/8-10-26 925-671-5250 BG CALLED & EMAILED 4/17",
  "scope": "CUT KICK POLE / SEWER MAIN",
  "gps": "37.9523, -122.0534",
  "flag": ""
}, {
  "date": "05/13/26",
  "day": "Wed",
  "crew": "SAL",
  "wo": "35678025",
  "notes": "UECCO/VAC FROM 04-21",
  "addr": "18949 LOWELL AVE, HAYWARD",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026033101339-000",
  "notifDate": "04/02/26",
  "expDate": "04/28/26",
  "outage": "NTO/TXO 0900-1500",
  "circuit": "SENT 04-21",
  "poleInfo": "50-2 25KVA/M260134",
  "permit": "Permit# 11794 24HR/1/12/2027 PG&E@ACPWA.ORG 510-670-5450 BG EMAILED 4/17",
  "scope": "REPLACE POLE, SBS, INSTALL NEW TX, GRD GRID, MULTIPLE OH SVCS",
  "gps": "37.6678, -122.0856",
  "flag": ""
}, {
  "date": "05/14/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "35667177",
  "notes": "16C | 2 TC CREWS",
  "addr": "20181 STANTON AVE, CASTRO VALLEY LOC 2",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES LOC 2",
  "outage": "NTO/EOL/TXO/NE 0830-1530",
  "circuit": "SENT 04-22",
  "permit": "",
  "scope": "REPLACE POLE, SAME HOLE SET, CUT AND PATCH CONCRETE, HEAVY PHONE, INSTALL GROUND GRID, INSTALL NEW TX",
  "gps": "37.6934, -122.0745",
  "flag": "LOCKDOWN"
}, {
  "date": "05/14/26",
  "day": "Thu",
  "crew": "SAL",
  "wo": "35667177",
  "notes": "16C | W/BRIAN",
  "addr": "20181 STANTON AVE, CASTRO VALLEY LOC 1 & 3",
  "tc": "YES",
  "notif": "YES LOC 1",
  "outage": "W/BRIAN",
  "circuit": "SENT",
  "permit": "",
  "scope": "REFRAME LOC 1, UPGRADE TX, INSTALL UPGRADED OH SVC AT LOC 3",
  "gps": "37.6934, -122.0745",
  "flag": "LOCKDOWN"
}, {
  "date": "05/15/26",
  "day": "Fri",
  "crew": "BRIAN",
  "wo": "35612521",
  "notes": "PENDING PERMIT",
  "addr": "25500 CLAWITER RD, HAYWARD",
  "tc": "YES 0800",
  "notif": "NO",
  "outage": "NTO/NE 0830-1400",
  "circuit": "SENT 04-02",
  "permit": "PENDING PERMIT",
  "scope": "INSTALL NEW SECONDARY AND SVC, INSTALL SCADA CABLE",
  "gps": "37.6589, -122.0812",
  "flag": "PENDING"
}, {
  "date": "05/15/26",
  "day": "Fri",
  "crew": "SAL",
  "wo": "35561838",
  "notes": "PENDING PERMIT | NEED TO WORK 35561837 W/ THIS?",
  "addr": "INSTALL POLE",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "PERMIT# 11751 24HR/1/11/2027 PG&E@ACPWA.ORG 510-670-5450",
  "scope": "",
  "gps": "37.6812, -122.1189",
  "flag": "PENDING"
}, {
  "date": "05/18/26",
  "day": "Mon",
  "crew": "BRIAN",
  "wo": "35583529",
  "notes": "UECCO/VAC | NEW HOLE WILL BE PRE-DUG",
  "addr": "403 VERONA AVE, DANVILLE LOC 1",
  "tc": "YES 0800",
  "notif": "YES",
  "outage": "NTO 0830-1500 / EOL/NE 0900-1100",
  "circuit": "SENT 04-21",
  "permit": "",
  "scope": "MOVE 900AMP SW POLE 30' SW, NEW HOLE PRE-DUG, VAC DAY OF, START HANGING VIPER SW",
  "gps": "37.8234, -121.9756",
  "flag": ""
}, {
  "date": "05/19/26",
  "day": "Tue",
  "crew": "BRIAN",
  "wo": "35583529",
  "notes": "",
  "addr": "403 VERONA AVE, DANVILLE LOC 1 & 2",
  "tc": "YES 0800",
  "notif": "NO",
  "outage": "NTO/NE 0830-1500",
  "circuit": "SENT 04-21",
  "permit": "",
  "scope": "FINISH VIPER, ENERGIZE VIPER AND BYPASS, REMOVE SWITCHES AT LOC 2 AND MAKE JUMPERS",
  "gps": "37.8234, -121.9756",
  "flag": ""
}, {
  "date": "05/19/26",
  "day": "Tue",
  "crew": "SAL",
  "wo": "35678052",
  "notes": "07D | UECCO/VAC FROM 04-21 | TMI | TRANSFER TX",
  "addr": "366 OAKES BLVD, SAN LEANDRO",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026041602694-000",
  "notifDate": "04/20/26",
  "expDate": "05/14/26",
  "outage": "NTO/TXO 0830-1500",
  "circuit": "SENT 04-21",
  "poleInfo": "50-3",
  "permit": "EUPOLE-25-0006-V1 24HR/9/7/2026 ETINSPECTIONS@SANLEANDRO.ORG 510-577-3308",
  "scope": "REPLACE POLE, SET BESIDE AND PULL OLD POLE, TRANSFER EXISTING TX",
  "gps": "37.7256, -122.1567",
  "flag": "LOCKDOWN"
}, {
  "date": "05/20/26",
  "day": "Wed",
  "crew": "BRIAN",
  "wo": "35255728",
  "notes": "FROM 05-01",
  "addr": "1450 BOLLINGER CANYON RD, MORAGA",
  "tc": "NO",
  "notif": "YES LOC 1",
  "outage": "NTO/NE 0830-1230",
  "circuit": "SENT 04-01",
  "permit": "",
  "scope": "INSTALL NEW TX, & NEW UG SVC, ALL OFF ROAD",
  "gps": "37.8248, -122.0646",
  "flag": ""
}, {
  "date": "05/20/26",
  "day": "Wed",
  "crew": "SAL",
  "wo": "35692681",
  "notes": "UECCO/VAC 3-MAN | LOC 1 TX UPGRADED AT FUTURE DATE",
  "addr": "308 BOWLING GREEN ST, SAN LEANDRO",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "NTO/NE 0830-1430",
  "circuit": "SENT 04-02",
  "permit": "PERMIT# EUNEWSV-25-0011 24HR/5/26/2026 ETINSPECTIONS@SANLEANDRO.ORG 510-577-3308",
  "scope": "REPLACE POLE, INSTALL NEW TX, GRD GRID, MULTIPLE OH SVC'S, CUT IN SEC BREAKS",
  "gps": "37.7223, -122.1523",
  "flag": ""
}, {
  "date": "05/21/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "35702238",
  "notes": "3RD THURSDAY | NEED TO SUBMIT CWC",
  "addr": "7757 MILLBROOK AVE, DUBLIN",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6967, -121.9234",
  "flag": "PENDING"
}, {
  "date": "05/21/26",
  "day": "Thu",
  "crew": "SAL",
  "wo": "35702238",
  "notes": "3RD THURSDAY",
  "addr": "7757 MILLBROOK AVE, DUBLIN",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6967, -121.9234",
  "flag": ""
}, {
  "date": "05/22/26",
  "day": "Fri",
  "crew": "BRIAN",
  "wo": "35678408",
  "notes": "UECCO/VAC FROM 04-20",
  "addr": "25386 2ND ST, HAYWARD",
  "tc": "YES 0800 NO PARKS",
  "notif": "2026041504046-000",
  "notifDate": "04/17/26",
  "expDate": "05/13/26",
  "outage": "NTO/TXO 0830-1630",
  "circuit": "SENT 04-20",
  "poleInfo": "50-H1 100KVA/M260140",
  "permit": "Permit# 11825 24HR/1/28/2027 PG&E@ACPWA.ORG 510-670-5450 BG EMAILED 4/17",
  "scope": "REPLACE POLE, UPGRADE TX, INSTALL GRD GRID, UPGRADE MULTIPLE OH SVC",
  "gps": "37.6567, -122.0901",
  "flag": ""
}, {
  "date": "05/25/26",
  "day": "Mon",
  "crew": "ALL OFF",
  "wo": "",
  "notes": "",
  "addr": "",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "MEMORIAL DAY \u2014 ALL crews off",
  "gps": "",
  "flag": "HOLIDAY"
}, {
  "date": "05/26/26",
  "day": "Tue",
  "crew": "BRIAN",
  "wo": "35549196",
  "notes": "PERMIT EXT REQ 4/10",
  "addr": "1571 INDUSTRIAL PKWY W, HAYWARD",
  "tc": "YES 0800",
  "notif": "NO",
  "outage": "NTO/OTHR/TXO 0830-1230",
  "circuit": "SENT 04-07",
  "permit": "",
  "scope": "REMOVE TX, SEC, SVC, REMOVE METERS",
  "gps": "37.6623, -122.0978",
  "flag": ""
}, {
  "date": "05/26/26",
  "day": "Tue",
  "crew": "SAL",
  "wo": "35615355",
  "notes": "NEEDS CWC | PENDING PERMIT",
  "addr": "4840 CHRISTINE CT, UNION CITY",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.5978, -122.0289",
  "flag": "PENDING"
}, {
  "date": "05/27/26",
  "day": "Wed",
  "crew": "BRIAN",
  "wo": "35420071",
  "notes": "NEED TO SUBMIT CWC \u2014 PREP WORK",
  "addr": "27865 MANON AVE, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "PREP WORK",
  "gps": "37.6612, -122.0923",
  "flag": ""
}, {
  "date": "05/27/26",
  "day": "Wed",
  "crew": "BRIAN",
  "wo": "35678138",
  "notes": "UECCO/VAC MOVED 04-27",
  "addr": "1929 LINDWOOD WAY, SAN LEANDRO",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "EOL 0830-1430",
  "circuit": "",
  "poleInfo": "50-3 25KVA/M262567",
  "permit": "",
  "scope": "REPLACE POLE, UPGRADE TX, NEW GRD GRID, REPL MULTIPLE OH SVC, CUT IN SEC BREAKS, CUT AND PATCH CONCRETE",
  "gps": "37.7312, -122.1498",
  "flag": ""
}, {
  "date": "05/27/26",
  "day": "Wed",
  "crew": "SAL",
  "wo": "35420071",
  "notes": "NEED TO SUBMIT CWC \u2014 PREP WORK",
  "addr": "27865 MANON AVE, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "PREP WORK",
  "gps": "37.6612, -122.0923",
  "flag": ""
}, {
  "date": "05/28/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "35690885",
  "notes": "",
  "addr": "28028 PETRINA CT, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6578, -122.0889",
  "flag": ""
}, {
  "date": "05/28/26",
  "day": "Thu",
  "crew": "SAL",
  "wo": "35690885",
  "notes": "",
  "addr": "28028 PETRINA CT, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6578, -122.0889",
  "flag": ""
}, {
  "date": "05/29/26",
  "day": "Fri",
  "crew": "BRIAN",
  "wo": "35690885",
  "notes": "",
  "addr": "28028 PETRINA CT, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6578, -122.0889",
  "flag": ""
}, {
  "date": "05/29/26",
  "day": "Fri",
  "crew": "SAL",
  "wo": "35690885",
  "notes": "",
  "addr": "28028 PETRINA CT, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6578, -122.0889",
  "flag": ""
}, {
  "date": "06/01/26",
  "day": "Mon",
  "crew": "BRIAN",
  "wo": "35420071",
  "notes": "SUBMIT CWC",
  "addr": "27865 MANON AVE, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6612, -122.0923",
  "flag": ""
}, {
  "date": "06/01/26",
  "day": "Mon",
  "crew": "BRIAN",
  "wo": "35670315",
  "notes": "PENDING PGE",
  "addr": "5341 CROW CANYON RD, CASTRO VALLEY",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6934, -122.0689",
  "flag": "WAITING"
}, {
  "date": "06/01/26",
  "day": "Mon",
  "crew": "SAL",
  "wo": "35255728",
  "notes": "FROM 05-01 16K",
  "addr": "1450 BOLLINGER CANYON RD, MORAGA",
  "tc": "NO",
  "notif": "YES LOC 1",
  "outage": "NTO/NE 0830-1230",
  "circuit": "SENT 04-01",
  "permit": "",
  "scope": "INSTALL NEW TX, & NEW UG SVC, ALL OFF ROAD",
  "gps": "37.8248, -122.0646",
  "flag": ""
}, {
  "date": "06/02/26",
  "day": "Tue",
  "crew": "BRIAN",
  "wo": "35654185",
  "notes": "NEED TO SUBMIT CWC",
  "addr": "4420 MOWRY AVE, FREMONT",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.5412, -121.9823",
  "flag": "PENDING"
}, {
  "date": "06/02/26",
  "day": "Tue",
  "crew": "SAL",
  "wo": "35654185",
  "notes": "",
  "addr": "4420 MOWRY AVE, FREMONT",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.5412, -121.9823",
  "flag": ""
}, {
  "date": "06/02/26",
  "day": "Tue",
  "crew": "PAR",
  "wo": "35654185",
  "notes": "",
  "addr": "4420 MOWRY AVE, FREMONT",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.5412, -121.9823",
  "flag": ""
}, {
  "date": "06/03/26",
  "day": "Wed",
  "crew": "BRIAN",
  "wo": "35677940",
  "notes": "NEED TO SUBMIT CWC",
  "addr": "18921 PATTON DR, CASTRO VALLEY",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6934, -122.0745",
  "flag": "PENDING"
}, {
  "date": "06/03/26",
  "day": "Wed",
  "crew": "SAL",
  "wo": "35677940",
  "notes": "",
  "addr": "18921 PATTON DR, CASTRO VALLEY",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6934, -122.0745",
  "flag": ""
}, {
  "date": "06/03/26",
  "day": "Wed",
  "crew": "PAR",
  "wo": "35677940",
  "notes": "",
  "addr": "18921 PATTON DR, CASTRO VALLEY",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6934, -122.0745",
  "flag": ""
}, {
  "date": "06/04/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "35661812",
  "notes": "NEED TO SUBMIT CWC",
  "addr": "24681 WILLIMET WAY, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6589, -122.0867",
  "flag": "PENDING"
}, {
  "date": "06/04/26",
  "day": "Thu",
  "crew": "SAL",
  "wo": "35661812",
  "notes": "",
  "addr": "24681 WILLIMET WAY, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6589, -122.0867",
  "flag": ""
}, {
  "date": "06/04/26",
  "day": "Thu",
  "crew": "PAR",
  "wo": "35661812",
  "notes": "",
  "addr": "24681 WILLIMET WAY, HAYWARD",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6589, -122.0867",
  "flag": ""
}, {
  "date": "06/05/26",
  "day": "Fri",
  "crew": "BRIAN",
  "wo": "35651216",
  "notes": "NEED TO SUBMIT CWC",
  "addr": "8191 MERION DR, NEWARK",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.5312, -122.0378",
  "flag": "PENDING"
}, {
  "date": "06/05/26",
  "day": "Fri",
  "crew": "SAL",
  "wo": "35695088",
  "notes": "NEED TO SUBMIT CWC",
  "addr": "563 DOANE ST, SAN LORENZO",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6812, -122.1167",
  "flag": "PENDING"
}, {
  "date": "06/05/26",
  "day": "Fri",
  "crew": "PAR",
  "wo": "35695088",
  "notes": "",
  "addr": "563 DOANE ST, SAN LORENZO",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6812, -122.1167",
  "flag": ""
}, {
  "date": "06/08/26",
  "day": "Mon",
  "crew": "BRIAN",
  "wo": "35696352",
  "notes": "NEED TO SUBMIT CWC",
  "addr": "3450 BADDING RD, CASTRO VALLEY",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6923, -122.0712",
  "flag": "PENDING"
}, {
  "date": "06/08/26",
  "day": "Mon",
  "crew": "SAL",
  "wo": "35696352",
  "notes": "",
  "addr": "3450 BADDING RD, CASTRO VALLEY",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6923, -122.0712",
  "flag": ""
}, {
  "date": "06/08/26",
  "day": "Mon",
  "crew": "PAR",
  "wo": "35696352",
  "notes": "",
  "addr": "3450 BADDING RD, CASTRO VALLEY",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "",
  "gps": "37.6923, -122.0712",
  "flag": ""
}, {
  "date": "06/09/26",
  "day": "Tue",
  "crew": "BRIAN",
  "wo": "35391849",
  "notes": "FROM 5/13 PENDING PERMIT",
  "addr": "946 VERONA AVE, LIVERMORE LOC 1,2,3,6",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "NTO/NE/TXO 0830-1430",
  "circuit": "",
  "permit": "PENDING PERMIT",
  "scope": "INSTALL NEW TX, GRD GRID, SEC BREAKS, OH SVC'S",
  "gps": "37.6834, -121.8245",
  "flag": "PENDING"
}, {
  "date": "06/09/26",
  "day": "Tue",
  "crew": "SAL",
  "wo": "35391849",
  "notes": "FROM 5/13 NEED CWC",
  "addr": "946 VERONA AVE, LIVERMORE LOC 4,5,6",
  "tc": "YES 0800 NO PARKS",
  "notif": "YES",
  "outage": "W/BRIAN",
  "circuit": "",
  "permit": "",
  "scope": "INSTALL NEW TX, GRD GRID, SEC BREAKS, NEW SECONDARY, MULTIPLE SVC'S",
  "gps": "37.6834, -121.8245",
  "flag": ""
}, {
  "date": "06/09/26",
  "day": "Tue",
  "crew": "PAR",
  "wo": "",
  "notes": "MEGA BUNDLE",
  "addr": "",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "MEGA BUNDLE",
  "gps": "",
  "flag": ""
}, {
  "date": "06/10/26",
  "day": "Wed",
  "crew": "BRIAN",
  "wo": "35637926",
  "notes": "UECCO/VAC FROM 5-20 | PUSH TO JUNE FOR PERMIT",
  "addr": "133 PERSHING DR, SAN LEANDRO",
  "tc": "YES NO PARKS",
  "notif": "YES",
  "outage": "NTO/TXO 0830-1430",
  "circuit": "SENT 04-02",
  "permit": "PENDING PERMIT",
  "scope": "REPLACE POLE, UPGRADE TX, INSTALL NEW GROUND GRID, REPLACE 4 OH SVC'S",
  "gps": "37.7212, -122.1545",
  "flag": "PENDING"
}, {
  "date": "06/11/26",
  "day": "Thu",
  "crew": "BRIAN",
  "wo": "",
  "notes": "MEGA BUNDLE",
  "addr": "",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "MEGA BUNDLE",
  "gps": "",
  "flag": ""
}, {
  "date": "06/11/26",
  "day": "Thu",
  "crew": "SAL",
  "wo": "",
  "notes": "MEGA BUNDLE",
  "addr": "",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "MEGA BUNDLE",
  "gps": "",
  "flag": ""
}, {
  "date": "06/11/26",
  "day": "Thu",
  "crew": "PAR",
  "wo": "",
  "notes": "MEGA BUNDLE",
  "addr": "",
  "tc": "",
  "notif": "",
  "outage": "",
  "circuit": "",
  "permit": "",
  "scope": "MEGA BUNDLE",
  "gps": "",
  "flag": ""
}];
const CREW_STYLES = {
  BRIAN: {
    bg: "#1f4a2e",
    border: "#3fb950",
    text: "#aff5b4",
    dot: "#3fb950"
  },
  SAL: {
    bg: "#3a2a00",
    border: "#d29922",
    text: "#f0d060",
    dot: "#d29922"
  },
  PAR: {
    bg: "#0d2d4a",
    border: "#79c0ff",
    text: "#a5d6ff",
    dot: "#79c0ff"
  },
  UECCO: {
    bg: "#2d1a4a",
    border: "#bc8cff",
    text: "#d2a8ff",
    dot: "#bc8cff"
  },
  "BRIAN/SAL": {
    bg: "#2a3a1a",
    border: "#a3d77a",
    text: "#d8f0b8",
    dot: "#a3d77a"
  },
  "ALL OFF": {
    bg: "#1c1c1c",
    border: "#484f58",
    text: "#6e7681",
    dot: "#6e7681"
  },
  "": {
    bg: "#161b22",
    border: "#30363d",
    text: "#8b949e",
    dot: "#8b949e"
  }
};
const FLAG_STYLES = {
  LOCKDOWN: {
    bg: "#3a0d0d",
    border: "#ff7b72",
    text: "#ffa198",
    icon: "🔒"
  },
  CANCELLED: {
    bg: "#1c1c1c",
    border: "#484f58",
    text: "#6e7681",
    icon: "✗"
  },
  MOVED: {
    bg: "#2d2200",
    border: "#d29922",
    text: "#f0d060",
    icon: "→"
  },
  PENDING: {
    bg: "#2d1a4a",
    border: "#bc8cff",
    text: "#d2a8ff",
    icon: "⏳"
  },
  WAITING: {
    bg: "#1a2d3a",
    border: "#79c0ff",
    text: "#a5d6ff",
    icon: "⏸"
  },
  NIGHTWORK: {
    bg: "#0d1a2d",
    border: "#79c0ff",
    text: "#a5d6ff",
    icon: "🌙"
  },
  HOLIDAY: {
    bg: "#2d2200",
    border: "#d29922",
    text: "#f0d060",
    icon: "🎉"
  }
};
const ALL_CREWS = ["BRIAN", "SAL", "PAR", "UECCO", "BRIAN/SAL", "ALL OFF"];
const ALL_FLAGS = ["LOCKDOWN", "CANCELLED", "MOVED", "PENDING", "WAITING", "NIGHTWORK", "HOLIDAY"];

// ── DATE UTILITIES ──
// Date strings are "MM/DD/YY" throughout, matching the source data.
function parseDate(s) {
  if (!s) return null;
  const [m, d, y] = s.split("/").map(Number);
  return new Date(2000 + y, m - 1, d);
}
function fmtDate(dt) {
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  const yy = String(dt.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}
function dayAbbr(dt) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dt.getDay()];
}
function startOfWeek(dt) {
  // Week starts Sunday
  const d = new Date(dt);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}
function addDays(dt, n) {
  const d = new Date(dt);
  d.setDate(d.getDate() + n);
  return d;
}
function monthName(dt) {
  return dt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
}
function shortMonthDay(dt) {
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

// ── PERSISTENT STORAGE WRAPPER ──
// Uses browser localStorage; falls back to in-memory if unavailable (rare edge case like private browsing iOS).
const STORAGE_KEY = "job_tracker_state_v1";
const inMemoryStore = {};
async function storageGet(key) {
  try {
    const v = window.localStorage.getItem(key);
    return v !== null ? v : inMemoryStore[key] ?? null;
  } catch (e) {
    return inMemoryStore[key] ?? null;
  }
}
async function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (e) {
    inMemoryStore[key] = value;
    return true;
  }
}

// ── MOBILE DETECTION HOOK ──
// Breakpoint at 768px: phones and small tablets get mobile UI
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = e => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);else mq.addListener(handler); // Safari fallback
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);else mq.removeListener(handler);
    };
  }, []);
  return isMobile;
}

// ── MAIN APP COMPONENT ──
function JobTracker() {
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const saveTimerRef = useRef(null);

  // UI state
  const [crewFilter, setCrewFilter] = useState(new Set()); // empty set = all
  const [flagFilter, setFlagFilter] = useState(new Set());
  const [search, setSearch] = useState("");
  const [viewStart, setViewStart] = useState(() => startOfWeek(new Date(2026, 3, 23))); // anchor on data
  const [weeksToShow, setWeeksToShow] = useState(2);

  // Modals
  const [editingJob, setEditingJob] = useState(null); // job object or {__new: true}
  const [reschedulingJob, setReschedulingJob] = useState(null);

  // ── LOAD FROM STORAGE ──
  useEffect(() => {
    (async () => {
      const stored = await storageGet(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setJobs(parsed);
            setLoaded(true);
            return;
          }
        } catch (e) {/* fall through to seed */}
      }
      // First run: seed with the 107 imported jobs
      setJobs(SEED_JOBS);
      setLoaded(true);
    })();
  }, []);

  // ── AUTOSAVE ──
  useEffect(() => {
    if (!loaded) return;
    setSaveState("saving");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      try {
        await storageSet(STORAGE_KEY, JSON.stringify(jobs));
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 1500);
      } catch (e) {
        setSaveState("error");
      }
    }, 400);
    return () => saveTimerRef.current && clearTimeout(saveTimerRef.current);
  }, [jobs, loaded]);

  // ── DERIVED: build week ranges + index jobs by date ──
  const weeks = useMemo(() => {
    const out = [];
    for (let w = 0; w < weeksToShow; w++) {
      const start = addDays(viewStart, w * 7);
      const days = [];
      for (let i = 0; i < 7; i++) days.push(addDays(start, i));
      out.push({
        start,
        days
      });
    }
    return out;
  }, [viewStart, weeksToShow]);
  const jobsByDate = useMemo(() => {
    const map = {};
    for (const j of jobs) {
      if (!map[j.date]) map[j.date] = [];
      map[j.date].push(j);
    }
    return map;
  }, [jobs]);

  // ── FILTERING ──
  function jobPassesFilters(j) {
    if (crewFilter.size > 0 && !crewFilter.has(j.crew)) return false;
    if (flagFilter.size > 0 && !flagFilter.has(j.flag)) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const haystack = [j.wo, j.addr, j.circuit, j.notif, j.scope, j.notes, j.permit].filter(Boolean).join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  }

  // ── STATS ──
  const stats = useMemo(() => {
    const visible = jobs.filter(jobPassesFilters);
    const byCrew = {};
    for (const j of visible) byCrew[j.crew] = (byCrew[j.crew] || 0) + 1;
    return {
      total: jobs.length,
      visible: visible.length,
      byCrew
    };
  }, [jobs, crewFilter, flagFilter, search]);

  // ── MUTATIONS ──
  function toggleCrew(c) {
    const next = new Set(crewFilter);
    next.has(c) ? next.delete(c) : next.add(c);
    setCrewFilter(next);
  }
  function toggleFlag(f) {
    const next = new Set(flagFilter);
    next.has(f) ? next.delete(f) : next.add(f);
    setFlagFilter(next);
  }
  function clearFilters() {
    setCrewFilter(new Set());
    setFlagFilter(new Set());
    setSearch("");
  }
  function upsertJob(job) {
    setJobs(prev => {
      // Match on wo+date+crew (best available key since wo can repeat across crews/dates)
      const idx = prev.findIndex(j => j._id === job._id || j.wo && j.wo === job.wo && j.date === job.date && j.crew === job.crew && !job._id);
      if (job.__new) {
        const newJob = {
          ...job
        };
        delete newJob.__new;
        newJob._id = newJob._id || `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        return [...prev, newJob];
      }
      if (idx === -1) return [...prev, {
        ...job,
        _id: job._id || `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      }];
      const copy = [...prev];
      copy[idx] = {
        ...copy[idx],
        ...job
      };
      return copy;
    });
  }
  function deleteJob(job) {
    setJobs(prev => prev.filter(j => {
      if (job._id && j._id) return j._id !== job._id;
      return !(j.wo === job.wo && j.date === job.date && j.crew === job.crew);
    }));
  }
  function rescheduleJob(job, newDate, reason) {
    const oldDate = job.date;
    setJobs(prev => {
      const copy = [...prev];
      const idx = copy.findIndex(j => j._id === job._id || j.wo === job.wo && j.date === job.date && j.crew === job.crew);
      if (idx === -1) return prev;
      const parsed = parseDate(newDate);
      copy[idx] = {
        ...copy[idx],
        date: newDate,
        day: dayAbbr(parsed),
        _rescheduleHistory: [...(copy[idx]._rescheduleHistory || []), {
          from: oldDate,
          to: newDate,
          reason,
          at: new Date().toISOString()
        }]
      };
      return copy;
    });
  }
  function resetToSeed() {
    if (confirm(`Reset all data? This will restore the original ${SEED_JOBS.length} imported jobs and discard any changes.`)) {
      setJobs(SEED_JOBS);
    }
  }

  // ── EXPORT ──
  function exportJson() {
    const blob = new Blob([JSON.stringify(jobs, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `schedule_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── NAV ──
  function shiftWeeks(delta) {
    setViewStart(prev => addDays(prev, delta * 7));
  }
  function jumpToToday() {
    setViewStart(startOfWeek(new Date()));
  }
  function jumpToFirstJob() {
    if (jobs.length === 0) return;
    const sorted = [...jobs].sort((a, b) => (parseDate(a.date) || 0) - (parseDate(b.date) || 0));
    const first = parseDate(sorted[0].date);
    if (first) setViewStart(startOfWeek(first));
  }
  if (!loaded) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0d1117",
        color: "#8b949e",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace"
      }
    }, "Loading schedule...");
  }
  return /*#__PURE__*/React.createElement("div", {
    style: styles.app
  }, /*#__PURE__*/React.createElement("style", null, globalCss), /*#__PURE__*/React.createElement(Header, {
    isMobile: isMobile,
    saveState: saveState,
    onExport: exportJson,
    onReset: resetToSeed,
    onNewJob: () => setEditingJob({
      __new: true,
      date: fmtDate(new Date()),
      day: dayAbbr(new Date()),
      crew: "BRIAN",
      flag: ""
    }),
    onOpenDrawer: () => setDrawerOpen(true),
    totalJobs: jobs.length
  }), /*#__PURE__*/React.createElement("div", {
    style: isMobile ? styles.mainLayoutMobile : styles.mainLayout
  }, !isMobile && /*#__PURE__*/React.createElement(Sidebar, {
    isMobile: false,
    crewFilter: crewFilter,
    flagFilter: flagFilter,
    search: search,
    onSearchChange: setSearch,
    onToggleCrew: toggleCrew,
    onToggleFlag: toggleFlag,
    onClearFilters: clearFilters,
    stats: stats,
    weeksToShow: weeksToShow,
    setWeeksToShow: setWeeksToShow
  }), isMobile && drawerOpen && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: styles.drawerBackdrop,
    onClick: () => setDrawerOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    style: styles.drawerPanel
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.drawerHeader
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.drawerTitle
  }, "FILTERS & VIEW"), /*#__PURE__*/React.createElement("button", {
    style: styles.modalClose,
    onClick: () => setDrawerOpen(false)
  }, /*#__PURE__*/React.createElement(X, {
    size: 20
  }))), /*#__PURE__*/React.createElement(Sidebar, {
    isMobile: true,
    crewFilter: crewFilter,
    flagFilter: flagFilter,
    search: search,
    onSearchChange: setSearch,
    onToggleCrew: toggleCrew,
    onToggleFlag: toggleFlag,
    onClearFilters: clearFilters,
    stats: stats,
    weeksToShow: weeksToShow,
    setWeeksToShow: setWeeksToShow
  }))), /*#__PURE__*/React.createElement("div", {
    style: isMobile ? styles.calendarWrapperMobile : styles.calendarWrapper
  }, /*#__PURE__*/React.createElement(WeekNav, {
    isMobile: isMobile,
    viewStart: viewStart,
    weeksToShow: weeksToShow,
    onShift: shiftWeeks,
    onToday: jumpToToday,
    onFirstJob: jumpToFirstJob
  }), weeks.map((week, wi) => /*#__PURE__*/React.createElement(WeekBlock, {
    key: wi,
    isMobile: isMobile,
    week: week,
    jobsByDate: jobsByDate,
    jobPassesFilters: jobPassesFilters,
    onEditJob: setEditingJob,
    onRescheduleJob: setReschedulingJob,
    onAddJobAt: dateStr => setEditingJob({
      __new: true,
      date: dateStr,
      day: dayAbbr(parseDate(dateStr)),
      crew: "BRIAN",
      flag: ""
    })
  })))), isMobile && /*#__PURE__*/React.createElement("div", {
    style: styles.fabStack
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      ...styles.fab,
      ...styles.fabPrimary
    },
    onClick: () => setEditingJob({
      __new: true,
      date: fmtDate(new Date()),
      day: dayAbbr(new Date()),
      crew: "BRIAN",
      flag: ""
    }),
    title: "Add job"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 22
  }))), editingJob && /*#__PURE__*/React.createElement(EditJobModal, {
    isMobile: isMobile,
    job: editingJob,
    onSave: job => {
      upsertJob(job);
      setEditingJob(null);
    },
    onDelete: job => {
      deleteJob(job);
      setEditingJob(null);
    },
    onClose: () => setEditingJob(null)
  }), reschedulingJob && /*#__PURE__*/React.createElement(RescheduleModal, {
    isMobile: isMobile,
    job: reschedulingJob,
    jobsByDate: jobsByDate,
    onConfirm: (newDate, reason) => {
      rescheduleJob(reschedulingJob, newDate, reason);
      setReschedulingJob(null);
    },
    onClose: () => setReschedulingJob(null)
  }));
}

// ── HEADER ──
function Header({
  isMobile,
  saveState,
  onExport,
  onReset,
  onNewJob,
  onOpenDrawer,
  totalJobs
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const saveLabel = {
    idle: "",
    saving: "Saving…",
    saved: "✓ Saved",
    error: "⚠ Save failed"
  }[saveState];
  const saveColor = {
    saving: "#79c0ff",
    saved: "#3fb950",
    error: "#ff7b72",
    idle: "transparent"
  }[saveState];

  // ── MOBILE HEADER ──
  if (isMobile) {
    return /*#__PURE__*/React.createElement("header", {
      style: styles.headerMobile
    }, /*#__PURE__*/React.createElement("button", {
      style: styles.hamburger,
      onClick: onOpenDrawer,
      "aria-label": "Open menu"
    }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
      style: styles.logoMobile
    }, "MISSION", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#f78166"
      }
    }, "\xB7"), "DIV"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...styles.saveIndicatorMobile,
        color: saveColor
      }
    }, saveLabel || `${totalJobs}`), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: styles.iconBtn,
      onClick: () => setMenuOpen(v => !v),
      "aria-label": "More actions"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "5",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "19",
      r: "2"
    }))), menuOpen && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: styles.menuBackdrop,
      onClick: () => setMenuOpen(false)
    }), /*#__PURE__*/React.createElement("div", {
      style: styles.menuDropdown
    }, /*#__PURE__*/React.createElement("button", {
      style: styles.menuItem,
      onClick: () => {
        onNewJob();
        setMenuOpen(false);
      }
    }, /*#__PURE__*/React.createElement(Plus, {
      size: 14
    }), " New job"), /*#__PURE__*/React.createElement("button", {
      style: styles.menuItem,
      onClick: () => {
        onExport();
        setMenuOpen(false);
      }
    }, /*#__PURE__*/React.createElement(Download, {
      size: 14
    }), " Export JSON"), /*#__PURE__*/React.createElement("button", {
      style: {
        ...styles.menuItem,
        color: "#ff7b72"
      },
      onClick: () => {
        onReset();
        setMenuOpen(false);
      }
    }, /*#__PURE__*/React.createElement(RefreshCw, {
      size: 14
    }), " Reset to imported")))));
  }

  // ── DESKTOP HEADER ──
  return /*#__PURE__*/React.createElement("header", {
    style: styles.header
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.logo
  }, "MISSION ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#f78166"
    }
  }, "DIVISION"), /*#__PURE__*/React.createElement("span", {
    style: styles.logoSub
  }, "FIELD SCHEDULE")), /*#__PURE__*/React.createElement("div", {
    style: styles.headerLegend
  }, Object.entries(CREW_STYLES).filter(([k]) => ["BRIAN", "SAL", "PAR", "UECCO"].includes(k)).map(([k, s]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: styles.legItem
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...styles.legDot,
      background: s.dot
    }
  }), k))), /*#__PURE__*/React.createElement("div", {
    style: styles.headerActions
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...styles.saveIndicator,
      color: saveColor
    }
  }, saveLabel), /*#__PURE__*/React.createElement("span", {
    style: styles.jobCount
  }, totalJobs, " jobs"), /*#__PURE__*/React.createElement("button", {
    style: styles.btn,
    onClick: onNewJob,
    title: "Add new job"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 14
  }), " New"), /*#__PURE__*/React.createElement("button", {
    style: styles.btn,
    onClick: onExport,
    title: "Export as JSON"
  }, /*#__PURE__*/React.createElement(Download, {
    size: 14
  }), " Export"), /*#__PURE__*/React.createElement("button", {
    style: {
      ...styles.btn,
      ...styles.btnSubtle
    },
    onClick: onReset,
    title: "Reset to imported data"
  }, /*#__PURE__*/React.createElement(RefreshCw, {
    size: 14
  }))));
}

// ── SIDEBAR ──
function Sidebar({
  isMobile,
  crewFilter,
  flagFilter,
  search,
  onSearchChange,
  onToggleCrew,
  onToggleFlag,
  onClearFilters,
  stats,
  weeksToShow,
  setWeeksToShow
}) {
  const hasFilters = crewFilter.size > 0 || flagFilter.size > 0 || search.length > 0;
  return /*#__PURE__*/React.createElement("aside", {
    style: isMobile ? styles.sidebarMobile : styles.sidebar
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarSection
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarLabel
  }, "Search"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: isMobile ? 14 : 12,
    style: {
      position: "absolute",
      left: 10,
      top: isMobile ? 12 : 8,
      color: "#6e7681"
    }
  }), /*#__PURE__*/React.createElement("input", {
    style: isMobile ? styles.searchInputMobile : styles.searchInput,
    placeholder: "WO, address, circuit\u2026",
    value: search,
    onChange: e => onSearchChange(e.target.value)
  }), search && /*#__PURE__*/React.createElement("button", {
    onClick: () => onSearchChange(""),
    style: styles.searchClear
  }, /*#__PURE__*/React.createElement(X, {
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarSection
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarLabel
  }, "Crew"), ALL_CREWS.map(c => {
    const active = crewFilter.has(c);
    const style = CREW_STYLES[c];
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => onToggleCrew(c),
      style: {
        ...styles.filterBtn,
        ...(isMobile ? styles.filterBtnMobile : {}),
        ...(active ? {
          background: style.border,
          color: "#0d1117",
          borderColor: style.border,
          fontWeight: 700
        } : {})
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...styles.filterDot,
        background: style.dot
      }
    }), c || "UNASSIGNED");
  })), /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarSection
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarLabel
  }, "Status"), ALL_FLAGS.map(f => {
    const active = flagFilter.has(f);
    const style = FLAG_STYLES[f];
    return /*#__PURE__*/React.createElement("button", {
      key: f,
      onClick: () => onToggleFlag(f),
      style: {
        ...styles.filterBtn,
        ...(isMobile ? styles.filterBtnMobile : {}),
        ...(active ? {
          background: style.border,
          color: "#0d1117",
          borderColor: style.border,
          fontWeight: 700
        } : {})
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: isMobile ? 12 : 10,
        marginRight: 4
      }
    }, style.icon), f);
  })), hasFilters && /*#__PURE__*/React.createElement("button", {
    onClick: onClearFilters,
    style: {
      ...styles.filterBtn,
      ...(isMobile ? styles.filterBtnMobile : {}),
      color: "#ff7b72",
      borderColor: "#ff7b72"
    }
  }, "\u2715 Clear all filters"), /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarSection
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarLabel
  }, "View"), /*#__PURE__*/React.createElement("div", {
    style: styles.viewToggle
  }, [1, 2, 4].map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => setWeeksToShow(n),
    style: {
      ...styles.filterBtn,
      ...(isMobile ? styles.filterBtnMobile : {}),
      flex: 1,
      textAlign: "center",
      ...(weeksToShow === n ? {
        background: "#79c0ff",
        color: "#0d1117",
        borderColor: "#79c0ff",
        fontWeight: 700
      } : {})
    }
  }, n, "w")))), /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarSection
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.sidebarLabel
  }, "Stats"), /*#__PURE__*/React.createElement("div", {
    style: styles.statRow
  }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", null, stats.total)), /*#__PURE__*/React.createElement("div", {
    style: styles.statRow
  }, /*#__PURE__*/React.createElement("span", null, "Visible"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: stats.visible < stats.total ? "#f78166" : "#c9d1d9"
    }
  }, stats.visible)), Object.entries(stats.byCrew).sort((a, b) => b[1] - a[1]).map(([crew, n]) => /*#__PURE__*/React.createElement("div", {
    key: crew,
    style: styles.statRow
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: CREW_STYLES[crew]?.text || "#8b949e"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...styles.legDot,
      background: CREW_STYLES[crew]?.dot || "#8b949e",
      marginRight: 6
    }
  }), crew || "—"), /*#__PURE__*/React.createElement("span", null, n)))));
}

// ── WEEK NAV ──
function WeekNav({
  isMobile,
  viewStart,
  weeksToShow,
  onShift,
  onToday,
  onFirstJob
}) {
  const end = addDays(viewStart, weeksToShow * 7 - 1);
  if (isMobile) {
    return /*#__PURE__*/React.createElement("div", {
      style: styles.weekNavMobile
    }, /*#__PURE__*/React.createElement("div", {
      style: styles.weekNavMobileRow
    }, /*#__PURE__*/React.createElement("button", {
      style: styles.navBtnMobile,
      onClick: () => onShift(-1),
      "aria-label": "Previous week"
    }, /*#__PURE__*/React.createElement(ChevronLeft, {
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: styles.weekRangeMobile
    }, shortMonthDay(viewStart), " \u2014 ", shortMonthDay(end)), /*#__PURE__*/React.createElement("button", {
      style: styles.navBtnMobile,
      onClick: () => onShift(1),
      "aria-label": "Next week"
    }, /*#__PURE__*/React.createElement(ChevronRight, {
      size: 18
    }))), /*#__PURE__*/React.createElement("div", {
      style: styles.weekNavMobileRow
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        ...styles.navBtnMobile,
        flex: 1
      },
      onClick: onToday
    }, "Today"), /*#__PURE__*/React.createElement("button", {
      style: {
        ...styles.navBtnMobile,
        flex: 1
      },
      onClick: onFirstJob
    }, "Jump to data")));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: styles.weekNav
  }, /*#__PURE__*/React.createElement("button", {
    style: styles.navBtn,
    onClick: () => onShift(-1)
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 14
  }), " Prev"), /*#__PURE__*/React.createElement("button", {
    style: styles.navBtn,
    onClick: onToday
  }, "Today"), /*#__PURE__*/React.createElement("button", {
    style: styles.navBtn,
    onClick: onFirstJob
  }, "Jump to data"), /*#__PURE__*/React.createElement("div", {
    style: styles.weekRange
  }, shortMonthDay(viewStart), " \u2014 ", shortMonthDay(end), ", ", end.getFullYear()), /*#__PURE__*/React.createElement("button", {
    style: styles.navBtn,
    onClick: () => onShift(1)
  }, "Next ", /*#__PURE__*/React.createElement(ChevronRight, {
    size: 14
  })));
}

// ── WEEK BLOCK ──
function WeekBlock({
  isMobile,
  week,
  jobsByDate,
  jobPassesFilters,
  onEditJob,
  onRescheduleJob,
  onAddJobAt
}) {
  const weekLabel = `WEEK OF ${shortMonthDay(week.start).toUpperCase()}`;

  // Mobile: skip days that have no jobs and no active filter; or always show but compactly?
  // Decision: always show all 7 days so the schedule structure is clear, but stack vertically.

  return /*#__PURE__*/React.createElement("div", {
    style: styles.weekBlock
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.weekLabel
  }, weekLabel), /*#__PURE__*/React.createElement("div", {
    style: isMobile ? styles.weekStack : styles.weekGrid
  }, week.days.map(d => {
    const dateStr = fmtDate(d);
    const dayJobs = (jobsByDate[dateStr] || []).filter(jobPassesFilters);
    const allJobsOnDay = jobsByDate[dateStr] || [];
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const isToday = fmtDate(new Date()) === dateStr;
    const hiddenCount = allJobsOnDay.length - dayJobs.length;
    return /*#__PURE__*/React.createElement("div", {
      key: dateStr,
      style: {
        ...(isMobile ? styles.dayColMobile : styles.dayCol),
        ...(isWeekend ? styles.dayColWeekend : {}),
        ...(isToday ? styles.dayColToday : {})
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: isMobile ? styles.dayHeaderMobile : styles.dayHeader
    }, /*#__PURE__*/React.createElement("div", {
      style: isMobile ? styles.dayNameMobile : styles.dayName
    }, dayAbbr(d)), /*#__PURE__*/React.createElement("div", {
      style: isMobile ? styles.dayDateMobile : styles.dayDate
    }, d.getMonth() + 1, "/", d.getDate()), isMobile && dayJobs.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: styles.dayCountMobile
    }, dayJobs.length, " ", dayJobs.length === 1 ? "job" : "jobs"), /*#__PURE__*/React.createElement("button", {
      style: isMobile ? styles.dayAddBtnMobile : styles.dayAddBtn,
      onClick: () => onAddJobAt(dateStr),
      title: "Add job on this day",
      "aria-label": "Add job"
    }, /*#__PURE__*/React.createElement(Plus, {
      size: isMobile ? 16 : 11
    }))), /*#__PURE__*/React.createElement("div", {
      style: isMobile ? styles.dayBodyMobile : styles.dayBody
    }, dayJobs.map((j, ji) => /*#__PURE__*/React.createElement(JobCard, {
      key: (j._id || j.wo) + "_" + ji,
      isMobile: isMobile,
      job: j,
      onEdit: () => onEditJob(j),
      onReschedule: () => onRescheduleJob(j)
    })), dayJobs.length === 0 && allJobsOnDay.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: styles.dayEmpty
    }, "\u2014"), hiddenCount > 0 && /*#__PURE__*/React.createElement("div", {
      style: styles.dayHidden
    }, "+", hiddenCount, " hidden by filter")));
  })));
}

// ── JOB CARD ──
function JobCard({
  isMobile,
  job,
  onEdit,
  onReschedule
}) {
  const crewStyle = CREW_STYLES[job.crew] || CREW_STYLES[""];
  const flagStyle = job.flag ? FLAG_STYLES[job.flag] : null;

  // If flag is set, flag styling overrides crew (visually matches source)
  const cardBg = flagStyle ? flagStyle.bg : crewStyle.bg;
  const cardBorder = flagStyle ? flagStyle.border : crewStyle.border;
  const cardText = flagStyle ? flagStyle.text : crewStyle.text;
  const isLite = job.flag === "CANCELLED" || job.flag === "HOLIDAY" || job.crew === "ALL OFF";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...(isMobile ? styles.jobCardMobile : styles.jobCard),
      background: cardBg,
      borderLeftColor: cardBorder,
      color: cardText,
      opacity: isLite ? 0.75 : 1
    },
    onClick: onEdit,
    title: "Tap to edit"
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.jobCardTop
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...(isMobile ? styles.jobCrewMobile : styles.jobCrew),
      color: cardText
    }
  }, flagStyle && /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 4
    }
  }, flagStyle.icon), job.flag || job.crew || "—"), /*#__PURE__*/React.createElement("button", {
    style: isMobile ? styles.jobMoveBtnMobile : styles.jobMoveBtn,
    onClick: e => {
      e.stopPropagation();
      onReschedule();
    },
    title: "Reschedule",
    "aria-label": "Reschedule"
  }, "\u2194")), job.wo && /*#__PURE__*/React.createElement("div", {
    style: isMobile ? styles.jobWoMobile : styles.jobWo
  }, "WO ", job.wo), job.addr && /*#__PURE__*/React.createElement("div", {
    style: isMobile ? styles.jobAddrMobile : styles.jobAddr
  }, job.addr), job.outage && /*#__PURE__*/React.createElement("div", {
    style: isMobile ? styles.jobMetaMobile : styles.jobMeta
  }, "\u23F1 ", job.outage), job.scope && /*#__PURE__*/React.createElement("div", {
    style: isMobile ? styles.jobScopeMobile : styles.jobScope
  }, truncate(job.scope, isMobile ? 120 : 80)), job._rescheduleHistory && job._rescheduleHistory.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: styles.jobRescheduled
  }, "\u2194 moved ", job._rescheduleHistory.length, "\xD7"));
}
function truncate(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

// ── EDIT MODAL ──
function EditJobModal({
  isMobile,
  job,
  onSave,
  onDelete,
  onClose
}) {
  const [form, setForm] = useState({
    date: job.date || "",
    crew: job.crew || "BRIAN",
    wo: job.wo || "",
    addr: job.addr || "",
    outage: job.outage || "",
    flag: job.flag || "",
    scope: job.scope || "",
    notes: job.notes || "",
    tc: job.tc || "",
    circuit: job.circuit || "",
    notif: job.notif || "",
    permit: job.permit || "",
    gps: job.gps || ""
  });
  const [error, setError] = useState("");
  function update(k, v) {
    setForm(prev => ({
      ...prev,
      [k]: v
    }));
  }
  function handleSave() {
    // Validate date format
    if (!/^\d{2}\/\d{2}\/\d{2}$/.test(form.date)) {
      setError("Date must be MM/DD/YY format (e.g., 04/23/26)");
      return;
    }
    const dt = parseDate(form.date);
    if (!dt || isNaN(dt)) {
      setError("Invalid date");
      return;
    }
    const payload = {
      ...job,
      ...form,
      day: dayAbbr(dt)
    };
    if (job.__new) payload.__new = true;
    onSave(payload);
  }
  function handleDelete() {
    if (job.__new) {
      onClose();
      return;
    }
    if (confirm(`Delete job WO ${job.wo || "(no WO)"} on ${job.date}?`)) {
      onDelete(job);
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: isMobile ? styles.modalOverlayMobile : styles.modalOverlay,
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: isMobile ? styles.modalMobile : styles.modal,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.modalHeader
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: styles.modalTitle
  }, job.__new ? "✚ New Job" : "✏ Edit Job"), /*#__PURE__*/React.createElement("div", {
    style: styles.modalSub
  }, job.__new ? "Add a new scheduled job" : `WO ${job.wo || "—"} · ${job.date}`)), /*#__PURE__*/React.createElement("button", {
    style: styles.modalClose,
    onClick: onClose
  }, /*#__PURE__*/React.createElement(X, {
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: styles.modalBody
  }, error && /*#__PURE__*/React.createElement("div", {
    style: styles.errorBanner
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    size: 14
  }), " ", error), /*#__PURE__*/React.createElement("div", {
    style: styles.formSection
  }, "Scheduling"), /*#__PURE__*/React.createElement("div", {
    style: styles.formRow,
    className: "form-row-stack"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Date (MM/DD/YY)"
  }, /*#__PURE__*/React.createElement("input", {
    style: styles.input,
    value: form.date,
    onChange: e => update("date", e.target.value),
    placeholder: "04/23/26"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Crew"
  }, /*#__PURE__*/React.createElement("select", {
    style: styles.input,
    value: form.crew,
    onChange: e => update("crew", e.target.value)
  }, ALL_CREWS.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c || "—")), /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Unassigned \u2014")))), /*#__PURE__*/React.createElement("div", {
    style: styles.formRow,
    className: "form-row-stack"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Status / Flag"
  }, /*#__PURE__*/React.createElement("select", {
    style: styles.input,
    value: form.flag,
    onChange: e => update("flag", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 None \u2014"), ALL_FLAGS.map(f => /*#__PURE__*/React.createElement("option", {
    key: f,
    value: f
  }, FLAG_STYLES[f].icon, " ", f)))), /*#__PURE__*/React.createElement(Field, {
    label: "Outage Window"
  }, /*#__PURE__*/React.createElement("input", {
    style: styles.input,
    value: form.outage,
    onChange: e => update("outage", e.target.value),
    placeholder: "NTO 0830-1500"
  }))), /*#__PURE__*/React.createElement("div", {
    style: styles.formSection
  }, "Job Info"), /*#__PURE__*/React.createElement(Field, {
    label: "Work Order #"
  }, /*#__PURE__*/React.createElement("input", {
    style: styles.input,
    value: form.wo,
    onChange: e => update("wo", e.target.value),
    placeholder: "46355140"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Address / GPS"
  }, /*#__PURE__*/React.createElement("input", {
    style: styles.input,
    value: form.addr,
    onChange: e => update("addr", e.target.value),
    placeholder: "1828 Leo Ln, Concord"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Scope of Work"
  }, /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...styles.input,
      minHeight: 60,
      resize: "vertical"
    },
    value: form.scope,
    onChange: e => update("scope", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Notes"
  }, /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...styles.input,
      minHeight: 44,
      resize: "vertical"
    },
    value: form.notes,
    onChange: e => update("notes", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: styles.formSection
  }, "References"), /*#__PURE__*/React.createElement("div", {
    style: styles.formRow,
    className: "form-row-stack"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Traffic Control"
  }, /*#__PURE__*/React.createElement("input", {
    style: styles.input,
    value: form.tc,
    onChange: e => update("tc", e.target.value),
    placeholder: "YES 0800"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Circuit / Ref"
  }, /*#__PURE__*/React.createElement("input", {
    style: styles.input,
    value: form.circuit,
    onChange: e => update("circuit", e.target.value),
    placeholder: "26-0033512"
  }))), /*#__PURE__*/React.createElement("div", {
    style: styles.formRow,
    className: "form-row-stack"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Notification #"
  }, /*#__PURE__*/React.createElement("input", {
    style: styles.input,
    value: form.notif,
    onChange: e => update("notif", e.target.value),
    placeholder: "103437389"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "GPS"
  }, /*#__PURE__*/React.createElement("input", {
    style: styles.input,
    value: form.gps,
    onChange: e => update("gps", e.target.value),
    placeholder: "37.492693, -121.829774"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Permit Info"
  }, /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...styles.input,
      minHeight: 44,
      resize: "vertical"
    },
    value: form.permit,
    onChange: e => update("permit", e.target.value)
  })), job._rescheduleHistory && job._rescheduleHistory.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: styles.formSection
  }, "Reschedule History"), job._rescheduleHistory.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: styles.historyItem
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.historyDates
  }, h.from, " \u2192 ", h.to), /*#__PURE__*/React.createElement("div", {
    style: styles.historyReason
  }, h.reason), /*#__PURE__*/React.createElement("div", {
    style: styles.historyTime
  }, new Date(h.at).toLocaleString()))))), /*#__PURE__*/React.createElement("div", {
    style: styles.modalActions
  }, !job.__new && /*#__PURE__*/React.createElement("button", {
    style: {
      ...styles.btn,
      ...styles.btnDanger
    },
    onClick: handleDelete
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 14
  }), " Delete"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: styles.btn,
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    style: {
      ...styles.btn,
      ...styles.btnPrimary
    },
    onClick: handleSave
  }, /*#__PURE__*/React.createElement(Check, {
    size: 14
  }), " ", job.__new ? "Add Job" : "Save Changes"))));
}
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: styles.field
  }, /*#__PURE__*/React.createElement("label", {
    style: styles.fieldLabel
  }, label), children);
}

// ── RESCHEDULE MODAL ──
function RescheduleModal({
  isMobile,
  job,
  jobsByDate,
  onConfirm,
  onClose
}) {
  const initialDate = parseDate(job.date) || new Date();
  const [viewMonth, setViewMonth] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  function buildGrid() {
    const first = new Date(viewMonth);
    const startPad = first.getDay();
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startPad; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
    return cells;
  }
  function confirm() {
    if (!selectedDate) {
      setError("Pick a new date");
      return;
    }
    if (!reason.trim()) {
      setError("Reason is required");
      return;
    }
    onConfirm(fmtDate(selectedDate), reason.trim());
  }
  return /*#__PURE__*/React.createElement("div", {
    style: styles.modalOverlay,
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...styles.modal,
      maxWidth: 480
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.modalHeader
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: styles.modalTitle
  }, "\u2194 Reschedule"), /*#__PURE__*/React.createElement("div", {
    style: styles.modalSub
  }, "WO ", job.wo || "—", " \xB7 currently ", job.date)), /*#__PURE__*/React.createElement("button", {
    style: styles.modalClose,
    onClick: onClose
  }, /*#__PURE__*/React.createElement(X, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: styles.modalBody
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.dpNav
  }, /*#__PURE__*/React.createElement("button", {
    style: styles.navBtn,
    onClick: () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
  }, "\u2039"), /*#__PURE__*/React.createElement("div", {
    style: styles.dpMonth
  }, monthName(viewMonth)), /*#__PURE__*/React.createElement("button", {
    style: styles.navBtn,
    onClick: () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    style: styles.dpWeekdays
  }, ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: styles.dpWeekday
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: styles.dpGrid
  }, buildGrid().map((d, i) => {
    if (!d) return /*#__PURE__*/React.createElement("div", {
      key: i
    });
    const ds = fmtDate(d);
    const isCurrent = ds === job.date;
    const isSelected = selectedDate && fmtDate(selectedDate) === ds;
    const isToday = fmtDate(new Date()) === ds;
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const hasJobs = (jobsByDate[ds] || []).length > 0;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      disabled: isCurrent,
      onClick: () => {
        setSelectedDate(d);
        setError("");
      },
      style: {
        ...styles.dpCell,
        ...(isWeekend ? {
          color: "#6e7681"
        } : {}),
        ...(isToday ? {
          borderColor: "#79c0ff"
        } : {}),
        ...(isCurrent ? {
          background: "#f78166",
          color: "#0d1117",
          cursor: "not-allowed"
        } : {}),
        ...(isSelected ? {
          background: "#3fb950",
          color: "#0d1117",
          borderColor: "#3fb950",
          fontWeight: 700
        } : {})
      }
    }, d.getDate(), hasJobs && !isCurrent && !isSelected && /*#__PURE__*/React.createElement("span", {
      style: styles.dpDot
    }, "\xB7"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: styles.fieldLabel
  }, "Reason for rescheduling"), /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...styles.input,
      minHeight: 60,
      resize: "vertical"
    },
    value: reason,
    onChange: e => {
      setReason(e.target.value);
      setError("");
    },
    placeholder: "e.g. Permit not approved, crew conflict, customer not ready\u2026"
  })), error && /*#__PURE__*/React.createElement("div", {
    style: styles.errorBanner
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    size: 14
  }), " ", error)), /*#__PURE__*/React.createElement("div", {
    style: styles.modalActions
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: styles.btn,
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    style: {
      ...styles.btn,
      ...styles.btnPrimary
    },
    onClick: confirm
  }, "Confirm Move"))));
}

// ── STYLES ──
const styles = {
  app: {
    minHeight: "100vh",
    background: "#0d1117",
    color: "#e6edf3",
    fontFamily: "'Barlow', -apple-system, sans-serif"
  },
  header: {
    background: "#161b22",
    borderBottom: "1px solid #30363d",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: 14,
    position: "sticky",
    top: 0,
    zIndex: 100,
    minHeight: 48
  },
  logo: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 16,
    letterSpacing: 2,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "baseline",
    gap: 8
  },
  logoSub: {
    fontSize: 9,
    letterSpacing: 3,
    color: "#6e7681",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500
  },
  headerLegend: {
    display: "flex",
    gap: 10,
    flexWrap: "nowrap",
    overflow: "hidden"
  },
  legItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 10,
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#8b949e",
    whiteSpace: "nowrap"
  },
  legDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    display: "inline-block",
    flexShrink: 0
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: "auto"
  },
  saveIndicator: {
    fontSize: 10,
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    transition: "color 0.2s",
    minWidth: 60,
    textAlign: "right"
  },
  jobCount: {
    fontSize: 10,
    fontFamily: "'JetBrains Mono', monospace",
    color: "#6e7681",
    letterSpacing: 0.5
  },
  btn: {
    background: "transparent",
    border: "1px solid #30363d",
    color: "#c9d1d9",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    padding: "5px 10px",
    borderRadius: 4,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    transition: "all 0.15s"
  },
  btnPrimary: {
    background: "#3fb950",
    borderColor: "#3fb950",
    color: "#0d1117",
    fontWeight: 700
  },
  btnDanger: {
    background: "transparent",
    borderColor: "#ff7b72",
    color: "#ff7b72"
  },
  btnSubtle: {
    padding: "5px 8px",
    color: "#6e7681"
  },
  mainLayout: {
    display: "flex",
    alignItems: "flex-start"
  },
  sidebar: {
    width: 180,
    minWidth: 180,
    flexShrink: 0,
    background: "#161b22",
    borderRight: "1px solid #30363d",
    padding: "14px 10px",
    position: "sticky",
    top: 48,
    height: "calc(100vh - 48px)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 18
  },
  sidebarSection: {
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  sidebarLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#6e7681",
    paddingBottom: 5,
    borderBottom: "1px solid #30363d",
    marginBottom: 4
  },
  searchInput: {
    width: "100%",
    background: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: 4,
    color: "#e6edf3",
    padding: "6px 8px 6px 24px",
    fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none"
  },
  searchClear: {
    position: "absolute",
    right: 4,
    top: 4,
    background: "transparent",
    border: "none",
    color: "#6e7681",
    cursor: "pointer",
    padding: 4,
    display: "flex"
  },
  filterBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    width: "100%",
    textAlign: "left",
    background: "transparent",
    border: "1px solid #30363d",
    color: "#8b949e",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    padding: "5px 8px",
    borderRadius: 4,
    cursor: "pointer",
    transition: "all 0.12s"
  },
  filterDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    display: "inline-block",
    flexShrink: 0
  },
  viewToggle: {
    display: "flex",
    gap: 4
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10,
    fontFamily: "'JetBrains Mono', monospace",
    color: "#8b949e",
    padding: "2px 2px"
  },
  calendarWrapper: {
    flex: 1,
    minWidth: 0,
    padding: "20px 20px",
    maxWidth: "calc(100vw - 180px)"
  },
  weekNav: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: "1px solid #30363d"
  },
  navBtn: {
    background: "transparent",
    border: "1px solid #30363d",
    color: "#c9d1d9",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    padding: "5px 10px",
    borderRadius: 4,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 4
  },
  weekRange: {
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#c9d1d9"
  },
  weekBlock: {
    marginBottom: 28
  },
  weekLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#6e7681",
    marginBottom: 8,
    paddingLeft: 4
  },
  weekGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4
  },
  dayCol: {
    minHeight: 180,
    background: "#161b22",
    border: "1px solid #30363d",
    borderRadius: 6,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  dayColWeekend: {
    background: "#0f1318",
    opacity: 0.6
  },
  dayColToday: {
    borderColor: "#f78166",
    boxShadow: "0 0 0 1px #f78166"
  },
  dayHeader: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 8px",
    borderBottom: "1px solid #30363d",
    background: "#1c2128"
  },
  dayName: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#c9d1d9"
  },
  dayDate: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#6e7681",
    marginLeft: "auto"
  },
  dayAddBtn: {
    background: "transparent",
    border: "1px solid #30363d",
    color: "#6e7681",
    borderRadius: 3,
    padding: "1px 3px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    lineHeight: 1
  },
  dayBody: {
    padding: 4,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
    overflowY: "auto"
  },
  dayEmpty: {
    color: "#30363d",
    fontSize: 10,
    textAlign: "center",
    padding: "20px 0",
    fontFamily: "'JetBrains Mono', monospace"
  },
  dayHidden: {
    color: "#6e7681",
    fontSize: 9,
    fontStyle: "italic",
    textAlign: "center",
    padding: "4px 0",
    fontFamily: "'JetBrains Mono', monospace"
  },
  jobCard: {
    borderLeft: "3px solid",
    borderRadius: 3,
    padding: "5px 7px",
    fontSize: 11,
    lineHeight: 1.35,
    cursor: "pointer",
    position: "relative",
    transition: "transform 0.08s, box-shadow 0.08s"
  },
  jobCardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2
  },
  jobCrew: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  jobMoveBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "none",
    color: "inherit",
    fontSize: 10,
    lineHeight: 1,
    padding: "1px 5px",
    borderRadius: 2,
    cursor: "pointer",
    opacity: 0.6
  },
  jobWo: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    fontWeight: 600,
    opacity: 0.85
  },
  jobAddr: {
    fontSize: 10,
    opacity: 0.8,
    marginTop: 1
  },
  jobMeta: {
    fontSize: 9,
    fontFamily: "'JetBrains Mono', monospace",
    opacity: 0.7,
    marginTop: 2
  },
  jobScope: {
    fontSize: 10,
    marginTop: 3,
    opacity: 0.75,
    fontStyle: "italic",
    borderTop: "1px dashed rgba(255,255,255,0.1)",
    paddingTop: 3
  },
  jobRescheduled: {
    fontSize: 8,
    fontFamily: "'JetBrains Mono', monospace",
    marginTop: 3,
    opacity: 0.6,
    letterSpacing: 0.5
  },
  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  modal: {
    background: "#161b22",
    border: "1px solid #30363d",
    borderRadius: 8,
    width: "100%",
    maxWidth: 600,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
  },
  modalHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: "1px solid #30363d"
  },
  modalTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#e6edf3"
  },
  modalSub: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#6e7681",
    marginTop: 2,
    letterSpacing: 0.5
  },
  modalClose: {
    background: "transparent",
    border: "none",
    color: "#f78166",
    cursor: "pointer",
    padding: 4,
    display: "flex"
  },
  modalBody: {
    padding: "16px 18px",
    overflowY: "auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  modalActions: {
    display: "flex",
    gap: 8,
    padding: "12px 18px",
    borderTop: "1px solid #30363d",
    alignItems: "center"
  },
  formSection: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#f78166",
    borderTop: "1px solid #30363d",
    paddingTop: 10,
    marginTop: 4
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  fieldLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#8b949e",
    fontWeight: 500
  },
  input: {
    background: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: 4,
    color: "#e6edf3",
    padding: "6px 8px",
    fontSize: 12,
    fontFamily: "'Barlow', sans-serif",
    outline: "none",
    width: "100%"
  },
  errorBanner: {
    background: "#3a0d0d",
    border: "1px solid #ff7b72",
    color: "#ffa198",
    padding: "6px 10px",
    borderRadius: 4,
    fontSize: 11,
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "'JetBrains Mono', monospace"
  },
  historyItem: {
    background: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: 4,
    padding: "6px 8px",
    fontSize: 11
  },
  historyDates: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    fontWeight: 600,
    color: "#f0d060"
  },
  historyReason: {
    marginTop: 2,
    color: "#c9d1d9",
    fontSize: 11
  },
  historyTime: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    color: "#6e7681",
    marginTop: 2
  },
  // Datepicker
  dpNav: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 10
  },
  dpMonth: {
    flex: 1,
    textAlign: "center",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#e6edf3"
  },
  dpWeekdays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 2,
    marginBottom: 4
  },
  dpWeekday: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: 1,
    color: "#6e7681",
    textAlign: "center",
    padding: "4px 0"
  },
  dpGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 2
  },
  dpCell: {
    background: "#0d1117",
    border: "1px solid #30363d",
    color: "#c9d1d9",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    padding: "8px 0",
    borderRadius: 3,
    cursor: "pointer",
    position: "relative",
    transition: "all 0.1s"
  },
  dpDot: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    color: "#f78166",
    fontSize: 14,
    lineHeight: 0.3
  },
  // ═══════════════════════════════════════════════════
  // ── MOBILE-SPECIFIC STYLES ──
  // ═══════════════════════════════════════════════════

  // Header (mobile)
  headerMobile: {
    background: "#161b22",
    borderBottom: "1px solid #30363d",
    padding: "10px 12px",
    paddingTop: "calc(10px + env(safe-area-inset-top))",
    display: "flex",
    alignItems: "center",
    gap: 10,
    position: "sticky",
    top: 0,
    zIndex: 100,
    minHeight: 52
  },
  logoMobile: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 15,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#e6edf3",
    flex: 1
  },
  saveIndicatorMobile: {
    fontSize: 10,
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    letterSpacing: 0.5,
    whiteSpace: "nowrap",
    minWidth: 28,
    textAlign: "right"
  },
  hamburger: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 40,
    height: 40,
    padding: "10px 8px",
    background: "transparent",
    border: "1px solid #30363d",
    borderRadius: 6,
    cursor: "pointer"
  },
  iconBtn: {
    width: 40,
    height: 40,
    padding: 0,
    background: "transparent",
    border: "1px solid #30363d",
    borderRadius: 6,
    color: "#c9d1d9",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  menuBackdrop: {
    position: "fixed",
    inset: 0,
    background: "transparent",
    zIndex: 200
  },
  menuDropdown: {
    position: "absolute",
    top: "calc(100% + 6px)",
    right: 0,
    background: "#161b22",
    border: "1px solid #30363d",
    borderRadius: 6,
    minWidth: 180,
    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
    zIndex: 201,
    display: "flex",
    flexDirection: "column",
    padding: 4
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    border: "none",
    color: "#c9d1d9",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0.5,
    padding: "10px 12px",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: 4,
    textTransform: "uppercase"
  },
  // Main layout (mobile)
  mainLayoutMobile: {
    display: "block",
    minHeight: "calc(100vh - 52px)"
  },
  calendarWrapperMobile: {
    padding: "12px 12px 80px 12px",
    // extra bottom for FAB
    maxWidth: "100%"
  },
  // Drawer (mobile sidebar)
  drawerBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(3px)",
    zIndex: 300
  },
  drawerPanel: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: "82%",
    maxWidth: 320,
    background: "#161b22",
    borderRight: "1px solid #30363d",
    zIndex: 301,
    display: "flex",
    flexDirection: "column",
    paddingTop: "env(safe-area-inset-top)",
    paddingBottom: "env(safe-area-inset-bottom)",
    overflowY: "auto",
    animation: "slideInLeft 0.22s ease-out"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderBottom: "1px solid #30363d",
    background: "#1c2128",
    position: "sticky",
    top: 0,
    zIndex: 2
  },
  drawerTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#e6edf3"
  },
  sidebarMobile: {
    width: "100%",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: 18
  },
  searchInputMobile: {
    width: "100%",
    background: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: 6,
    color: "#e6edf3",
    padding: "10px 10px 10px 32px",
    fontSize: 14,
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none"
  },
  filterBtnMobile: {
    fontSize: 13,
    padding: "10px 12px",
    minHeight: 40
  },
  // Week nav (mobile)
  weekNavMobile: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: "1px solid #30363d"
  },
  weekNavMobileRow: {
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  navBtnMobile: {
    background: "transparent",
    border: "1px solid #30363d",
    color: "#c9d1d9",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    padding: "10px 12px",
    borderRadius: 6,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minHeight: 40,
    minWidth: 40
  },
  weekRangeMobile: {
    flex: 1,
    textAlign: "center",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#c9d1d9"
  },
  // Week stack (mobile)
  weekStack: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  // Day col (mobile)
  dayColMobile: {
    background: "#161b22",
    border: "1px solid #30363d",
    borderRadius: 8,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  dayHeaderMobile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderBottom: "1px solid #30363d",
    background: "#1c2128"
  },
  dayNameMobile: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#c9d1d9"
  },
  dayDateMobile: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: "#8b949e"
  },
  dayCountMobile: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#f78166",
    marginLeft: "auto",
    padding: "3px 7px",
    background: "rgba(247,129,102,0.12)",
    borderRadius: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  dayAddBtnMobile: {
    width: 32,
    height: 32,
    background: "transparent",
    border: "1px solid #30363d",
    color: "#c9d1d9",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  dayBodyMobile: {
    padding: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  // Job card (mobile)
  jobCardMobile: {
    borderLeft: "4px solid",
    borderRadius: 6,
    padding: "10px 12px",
    fontSize: 13,
    lineHeight: 1.4,
    cursor: "pointer",
    position: "relative",
    minHeight: 44
  },
  jobCrewMobile: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  jobMoveBtnMobile: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "inherit",
    fontSize: 16,
    lineHeight: 1,
    padding: "6px 10px",
    borderRadius: 4,
    cursor: "pointer",
    minWidth: 36,
    minHeight: 32
  },
  jobWoMobile: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    fontWeight: 600,
    marginTop: 3
  },
  jobAddrMobile: {
    fontSize: 12,
    opacity: 0.85,
    marginTop: 3,
    wordBreak: "break-word"
  },
  jobMetaMobile: {
    fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
    opacity: 0.75,
    marginTop: 4
  },
  jobScopeMobile: {
    fontSize: 12,
    marginTop: 6,
    opacity: 0.8,
    fontStyle: "italic",
    borderTop: "1px dashed rgba(255,255,255,0.12)",
    paddingTop: 5,
    lineHeight: 1.4
  },
  // Floating action button (mobile)
  fabStack: {
    position: "fixed",
    bottom: "calc(16px + env(safe-area-inset-bottom))",
    right: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    zIndex: 50
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",
    color: "#0d1117"
  },
  fabPrimary: {
    background: "#f78166"
  },
  // Modals (mobile — full screen)
  modalOverlayMobile: {
    position: "fixed",
    inset: 0,
    background: "#0d1117",
    zIndex: 1000,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch"
  },
  modalMobile: {
    background: "#161b22",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "env(safe-area-inset-top)",
    paddingBottom: "env(safe-area-inset-bottom)"
  }
};

// ── KEYFRAMES & RESPONSIVE TWEAKS ──

const globalCss = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Barlow', sans-serif; -webkit-tap-highlight-color: transparent; }
  button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  input, select, textarea { font-size: 16px; } /* prevent iOS zoom on focus */

  /* Hover effects only on devices that support hover (not touch-primary) */
  @media (hover: hover) {
    button:hover:not(:disabled) { filter: brightness(1.2); }
    .jobCard:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
  }

  /* Active state gives touch feedback */
  button:active:not(:disabled) { transform: scale(0.97); }

  input:focus, select:focus, textarea:focus { border-color: #79c0ff !important; }

  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: #0d1117; }
  ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #484f58; }

  /* Hamburger lines */
  button[aria-label="Open menu"] span {
    display: block;
    width: 100%;
    height: 2px;
    background: #c9d1d9;
    border-radius: 1px;
  }

  /* Drawer slide-in */
  @keyframes slideInLeft {
    from { transform: translateX(-100%); opacity: 0.6; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Form rows stack on mobile */
  @media (max-width: 768px) {
    .form-row-stack { grid-template-columns: 1fr !important; }
  }
`;

// ── MOUNT ──
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(JobTracker, null));