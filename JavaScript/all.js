import data from '../data/data.js';
// json資料整理成陣列
const originalData = [...data.data];


// 列表 dom
const filterTable = document.querySelector('.filter-table tbody');

// 按鈕分類 dom
const sortedData = document.querySelector('.sort-area');

// 搜尋input dom
const searchInput = document.querySelector('.search-area input');


// 搜尋按鈕

const searchBtn = document.querySelector('[data-btn="search"]');

// 篩選區 dom
// h5 dom
const filterH5 = document.querySelector('.filter-area h5');

// console.log(searchInput.value, searchBtn);
// 渲染 Render function 獨立
// str, forEach, innerHTML
// data json
    // "交易日期": "110.09.14",
    // "種類代碼": "N05",
    // "作物代號": "11",
    // "作物名稱": "椰子",
    // "市場代號": "104",
    // "市場名稱": "台北二",
    // "上價": 43.1,
    // "中價": 30.9,
    // "下價": 20.0,
    // "平均價": 31.2,
    // "交易量": 1290.0
// 需要的資訊
//       <th scope="col">作物名稱</th>
      // <th scope="col">市場名稱</th>
      // <th scope="col">上價</th>
      // <th scope="col">中價</th>
      // <th scope="col">下價</th>
      // <th scope="col">平均價</th>
      // <th scope="col">交易量</th>

function render(data) { 
  let str = "";
  data.forEach((item, index) => { 
    str+=`  <tr>
      <td>${item['作物名稱']}</td>
      <td>${item['市場名稱']}</td>
      <td>${item['上價']}</td>
      <td>${item['中價']}</td>
      <td>${item['下價']}</td>
      <td>${item['平均價']}</td>
      <td>${item['交易量']}</td>
    </tr>`
  })
 
  filterTable.innerHTML = str;
}

// init() 是Render 加上 adjustData
// function init() {
//   render(adjustData);
// }
// init();

// 分類按鈕，抓出對應的產品
// 使用querySelector 抓出對應按鈕 addEventListener event.target.getAttribute 使用data-set埋按鈕名稱
// 假設點第二下正常
// 變的是data本身
// 蔬菜水果分類區
// N05 水果
// N04 蔬菜
// N06 花卉


sortedData.addEventListener('click', (e) => { 
  // 若壓到的不是button 則退開
  if (e.target.nodeName !== "BUTTON") { 
    return;
  }
  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active');
    filterTable.innerHTML=`<tr>
   <td class="text-center py-4" colspan="7">請輸入並搜尋想比價的作物名稱^＿^</td>

    </tr>`
    return;
  }
  // 區分data本身
  let data = {};
  e.target.classList.add('active');
  // 區分哪個按鈕
  if (e.target.getAttribute('data-sort') == "veggies") { 
    data = originalData.filter((item) => {
      return item["種類代碼"] == 'N04';
    })
  } else if (e.target.getAttribute('data-sort') == "fruits") {
    data = originalData.filter((item) => {
      return item["種類代碼"] == 'N05';
    })
  } else if (e.target.getAttribute('data-sort') == "flowers") {
    data = originalData.filter((item) => {
      return item["種類代碼"] == 'N06';
    })
  }
    render(data);
})


// 搜尋區

searchBtn.addEventListener("click", (e) => { 
  console.log('有點到');
  console.log(searchInput.value);
  if (searchInput.value.trim() == "") {
    alert('搜尋欄位不得為空');
    return;
  }
  // 注意有些作物名稱值為零，若不先排除，會出現錯誤
  let data = originalData.filter(item => {
    if (item['作物名稱']) { 
      return item['作物名稱'].match(searchInput.value);
    }
  }) || [];
  // 注意 data = [] 仍是true 
  if (data.length !== 0) {
    render(data);
    filterH5.innerHTML = `查看「${searchInput.value}」的比價結果`;
  } else { 
    filterTable.innerHTML = ` <tr>
  <td class="text-center py-4" colspan="7">查詢不到當日的交易資訊QQ</td>

    </tr>`;
    filterH5.innerHTML = "";
  }

})


// 排序