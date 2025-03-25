// 学生数据
const students = [
    { id: 1, name: "ADRIAN SIONG KHO YII HANG", chineseName: "顾宜航" },
    { id: 2, name: "ALLEYZABERTH JAWAI ANAK ROZIAN", chineseName: "艾丽珈" },
    { id: 3, name: "ANDRIANA EVA JONG", chineseName: "杨伊娃" },
    { id: 4, name: "ANEESAFIA TAM BINTI MUHAMMAD NUR IRFAN TAM", chineseName: "谭艾妮" },
    { id: 5, name: "ARENDELLE AVYONA LAI", chineseName: "赖代尔" },
    { id: 6, name: "BRAYDEN ALBERT ANAK RIBUN", chineseName: "贝乐登" },
    { id: 7, name: "CAROLLYNIE VIVIANNA ANAK NEILSON", chineseName: "卡乐妮" },
    { id: 8, name: "CHAFLICE CLEVIS ANAK SUNGGING", chineseName: "查夫利" },
    { id: 9, name: "CHRISTELLYNA MARTHA ANAK ROBERTO DURAN", chineseName: "柯琳娜" },
    { id: 10, name: "DARREN EMANUAL LEGA ANAK AUGUST MALANG", chineseName: "岱乐恩" },
    { id: 11, name: "DAVYNA ORLEE ANAK WILSON", chineseName: "岱韦娜" },
    { id: 12, name: "HARRY LIEW UMPANG ANAK WINSTAN", chineseName: "刘哈利" },
    { id: 13, name: "HEATHER UBONG HEZRON", chineseName: "贺德尔" },
    { id: 14, name: "HERCULES GAGAN ANAK HENRY GARAI", chineseName: "贺克力" },
    { id: 15, name: "IVANDER FEBRYAN ANAK SEPTHEN", chineseName: "伊凡德" },
    { id: 16, name: "IZZ ANAQI MATEEN BIN MOHAMMAD FIIRDAUS", chineseName: "易志儿" },
    { id: 17, name: "JANENEVY ANYIM ANAK JACKSON", chineseName: "贾奈韦" },
    { id: 18, name: "KENNY KEYN ANAK EDWIN", chineseName: "肯尼恩" },
    { id: 19, name: "LANSAM WIT ANAK LEON LITALI", chineseName: "李岚杉" },
    { id: 20, name: "MASLINA MAYA ANAK ALBERT", chineseName: "马丽娜" },
    { id: 21, name: "MOHAMMAD NUR FARISH BIN ABDULLAH", chineseName: "法力斯" },
    { id: 22, name: "NUR ALEESA HUMAIRA BINTI AZRUL AZMAN", chineseName: "艾莉莎" },
    { id: 23, name: "NUR HASNIZA HUSNA BINTI MOHAMMAD HARIS", chineseName: "哈妮莎" },
    { id: 24, name: "NUR IMANINA AZZAHRA BINTI MOHAMMAD ALIAS", chineseName: "阿扎拉" },
    { id: 25, name: "ORLEEY VIONETTA ANAK ANTHONY", chineseName: "欧丽仪" },
    { id: 26, name: "REVERLYN MANYIE ANAK ONG AH LEONG", chineseName: "黄乐琳" },
    { id: 27, name: "RYAN CHESTERPUTH ANAK JERRY", chineseName: "陈莱恩" },
    { id: 28, name: "SITI NUR NISRINA BINTI MOHD MASRUL HAIRI", chineseName: "斯利娜" },
    { id: 29, name: "VIHO RUEL CHEONG HONG FAN", chineseName: "张弘范" }
];

// 自动评语配置
const autoComments = [
    { min: 90, max: 100, comments: [
        "Bagus sekali! Teruskan usaha kamu!",
        "Hebat! Tulisan kemas dan jawapan betul. Syabas!",
        "Tahniah! Kamu sudah menguasai perkataan ini!"
    ]},
    { min: 75, max: 89, comments: [
        "Baik, cuma ada sedikit kesalahan. Cuba lagi!",
        "Hampir sempurna! Perbaiki kesilapan kecil, pasti lebih baik!",
        "Bagus! Tingkatkan lagi usaha kamu!"
    ]},
    { min: 60, max: 74, comments: [
        "Jangan putus asa! Terus berlatih, kamu pasti boleh!",
        "Cuba lagi! Latihan yang lebih akan membantu kamu!",
        "Jangan risau, belajar dari kesilapan dan teruskan usaha!"
    ]}
];

// 成绩记录（初始为空）
let scoreRecords = [];
let progressChart = null;

// 保存数据到localStorage
function saveData() {
    localStorage.setItem('scoreRecords', JSON.stringify(scoreRecords));
}

// 从localStorage加载数据
function loadData() {
    const savedData = localStorage.getItem('scoreRecords');
    if (savedData) {
        scoreRecords = JSON.parse(savedData);
    }
}

// 初始化页面
function initializePage() {
    // 加载保存的数据
    loadData();
    
    // 设置默认日期为今天
    document.getElementById('test-date').valueAsDate = new Date();
    
    // 生成学生列表
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.chineseName}</td>
            <td><input type="text" class="correct-answers" data-id="${student.id}" value="0" onchange="updateAutoComment(${student.id})" placeholder="0或TH"></td>
            <td class="auto-comment" data-id="${student.id}">-</td>
        `;
        studentList.appendChild(row);
    });
    
    // 生成家长界面的学生选择下拉框
    const studentSelect = document.getElementById('student-select');
    studentSelect.innerHTML = '<option value="">-- 选择学生 --</option>';
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.chineseName} (${student.name})`;
        studentSelect.appendChild(option);
    });
    
    // 生成教师管理界面的学生选择下拉框
    const manageStudentSelect = document.getElementById('manage-student-select');
    manageStudentSelect.innerHTML = '<option value="">-- 选择学生 --</option>';
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.chineseName} (${student.name})`;
        manageStudentSelect.appendChild(option);
    });
    
    // 更新成绩显示
    updateLatestNotification();
    updateStudentRecords();
}

// 检查教师访问权限
function checkTeacherAccess(event) {
    const teacherTab = document.getElementById('teacher');
    const parentTab = document.getElementById('parent');
    
    if (teacherTab.classList.contains('unlocked')) {
        openTab(event, 'teacher');
    } else {
        // 显示密码输入框
        document.getElementById('password-prompt').style.display = 'block';
        // 高亮教师标签
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
        // 隐藏所有内容
        teacherTab.classList.remove('active');
        parentTab.classList.remove('active');
    }
}

// 验证密码
function verifyPassword() {
    const password = document.getElementById('password').value;
    const errorSpan = document.getElementById('password-error');
    
    if (password === '123') {
        // 密码正确
        document.getElementById('password-prompt').style.display = 'none';
        document.getElementById('teacher').classList.add('unlocked');
        openTab({currentTarget: document.querySelector('.tab-btn:nth-child(2)')}, 'teacher');
        errorSpan.textContent = '';
    } else {
        // 密码错误
        errorSpan.textContent = '密码错误，请重试';
    }
}

// 切换标签页
function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;
    
    // 隐藏所有标签内容
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    
    // 移除所有按钮的active类
    tabbuttons = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }
    
    // 显示当前标签内容并激活按钮
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
    
    // 隐藏密码提示
    document.getElementById('password-prompt').style.display = 'none';
    
    // 如果切换到家长界面且没有选择学生，自动选择第一个学生
    if (tabName === 'parent' && document.getElementById('student-select').value === '' && students.length > 0) {
        document.getElementById('student-select').value = students[0].id;
        updateStudentRecords();
    }
    
    // 如果切换到教师界面，刷新管理表格
    if (tabName === 'teacher') {
        showStudentRecords();
    }
}

// 更新自动评语
function updateAutoComment(studentId) {
    const totalQuestions = parseInt(document.getElementById('total-questions').value) || 10;
    const correctInput = document.querySelector(`.correct-answers[data-id="${studentId}"]`);
    const inputValue = correctInput.value.toUpperCase();
    
    // 处理TH（缺席）情况
    if (inputValue === 'TH') {
        const commentCell = document.querySelector(`.auto-comment[data-id="${studentId}"]`);
        commentCell.textContent = "Tidak Hadir";
        return;
    }
    
    // 处理数字输入
    const correctAnswers = parseInt(inputValue) || 0;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // 找到匹配的评语范围
    const commentRange = autoComments.find(range => 
        percentage >= range.min && percentage <= range.max);
    
    if (commentRange) {
        // 随机选择一个评语
        const randomComment = commentRange.comments[
            Math.floor(Math.random() * commentRange.comments.length)];
        
        // 更新评语显示
        const commentCell = document.querySelector(`.auto-comment[data-id="${studentId}"]`);
        commentCell.textContent = randomComment;
    } else {
        // 如果分数低于60%，使用通用鼓励评语
        const commentCell = document.querySelector(`.auto-comment[data-id="${studentId}"]`);
        commentCell.textContent = "Jangan putus asa! Terus berlatih, kamu pasti boleh!";
    }
}

// 提交成绩
function submitScores() {
    const classId = document.getElementById('class-select').value;
    const testDate = document.getElementById('test-date').value;
    const totalQuestions = parseInt(document.getElementById('total-questions').value);
    
    const inputs = document.querySelectorAll('.correct-answers');
    
    inputs.forEach(input => {
        const studentId = input.getAttribute('data-id');
        const inputValue = input.value.toUpperCase();
        const student = students.find(s => s.id == studentId);
        const comment = document.querySelector(`.auto-comment[data-id="${studentId}"]`).textContent;
        
        // 处理TH（缺席）情况
        if (inputValue === 'TH') {
            const record = {
                id: Date.now(),
                studentId: parseInt(studentId),
                studentName: student.name,
                chineseName: student.chineseName,
                classId: parseInt(classId),
                testDate: testDate,
                totalQuestions: totalQuestions,
                correctAnswers: -1, // -1表示缺席
                percentage: -1, // -1表示缺席
                comment: comment,
                parentReviewed: false,
                timestamp: new Date().toISOString(),
                absent: true
            };
            scoreRecords.push(record);
            return;
        }
        
        // 处理数字输入
        const correctAnswers = parseInt(inputValue) || 0;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        const record = {
            id: Date.now(),
            studentId: parseInt(studentId),
            studentName: student.name,
            chineseName: student.chineseName,
            classId: parseInt(classId),
            testDate: testDate,
            totalQuestions: totalQuestions,
            correctAnswers: correctAnswers,
            percentage: percentage,
            comment: comment,
            parentReviewed: false,
            timestamp: new Date().toISOString(),
            absent: false
        };
        scoreRecords.push(record);
    });
    
    // 保存数据
    saveData();
    
    alert("成绩已提交成功！");
    
    // 更新显示
    updateLatestNotification();
    updateStudentRecords();
    showStudentRecords();
    
    // 清空输入
    document.querySelectorAll('.correct-answers').forEach(input => input.value = '0');
    document.querySelectorAll('.auto-comment').forEach(cell => cell.textContent = '-');
}

// 更新最新通知
function updateLatestNotification() {
    if (scoreRecords.length > 0) {
        // 按时间排序，获取最新记录
        const sortedRecords = [...scoreRecords].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp));
        const latestRecord = sortedRecords[0];
        
        const notification = document.getElementById('latest-notification');
        notification.textContent = `最新通知：老师已更新${latestRecord.testDate}的听写成绩`;
    }
}

// 更新学生成绩记录（家长界面）
function updateStudentRecords() {
    const studentId = document.getElementById('student-select').value;
    if (!studentId) return;
    
    const records = scoreRecords.filter(record => record.studentId == studentId);
    
    // 按日期排序
    records.sort((a, b) => new Date(a.testDate) - new Date(b.testDate));
    
    const scoreRecordsTable = document.getElementById('score-records');
    scoreRecordsTable.innerHTML = '';
    
    // 准备图表数据
    const labels = [];
    const percentages = [];
    
    records.forEach(record => {
        // 处理缺席情况
        if (record.absent) {
            const row = document.createElement('tr');
            row.className = 'absent';
            row.innerHTML = `
                <td>${record.testDate}</td>
                <td>${record.totalQuestions}</td>
                <td>TH (Tidak Hadir)</td>
                <td>-</td>
                <td>Tidak Hadir</td>
                <td><span class="progress-badge absent-badge">缺席</span></td>
                <td>-</td>
            `;
            scoreRecordsTable.appendChild(row);
            return;
        }
        
        // 确定表现等级
        let progressClass = '';
        let progressText = '';
        
        if (record.percentage >= 90) {
            progressClass = 'progress-excellent';
            progressText = '优秀';
        } else if (record.percentage >= 75) {
            progressClass = 'progress-good';
            progressText = '良好';
        } else if (record.percentage >= 60) {
            progressClass = 'progress-average';
            progressText = '中等';
        } else {
            progressClass = 'progress-poor';
            progressText = '需改进';
        }
        
        // 如果家长已确认，添加特殊样式
        const rowClass = record.parentReviewed ? 'parent-reviewed' : '';
        
        const row = document.createElement('tr');
        row.className = rowClass;
        row.innerHTML = `
            <td>${record.testDate}</td>
            <td>${record.totalQuestions}</td>
            <td>${record.correctAnswers}</td>
            <td>${record.percentage}%</td>
            <td>${record.comment}</td>
            <td><span class="progress-badge ${progressClass}">${progressText}</span></td>
            <td>
                ${record.parentReviewed ? 
                    '<span style="color:green">✓ Disemak</span>' : 
                    '<button class="action-btn review-btn" onclick="markAsReviewed('+record.id+')">Disemak oleh ibu bapa/penjaga</button>'}
            </td>
        `;
        scoreRecordsTable.appendChild(row);
        
        // 收集图表数据（不包括缺席记录）
        if (!record.absent) {
            labels.push(record.testDate);
            percentages.push(record.percentage);
        }
    });
    
    // 更新图表
    updateProgressChart(labels, percentages);
}

// 显示学生成绩记录（教师管理界面）
function showStudentRecords() {
    const studentId = document.getElementById('manage-student-select').value;
    if (!studentId) return;
    
    const records = scoreRecords.filter(record => record.studentId == studentId);
    
    // 按日期排序（最新在前）
    records.sort((a, b) => new Date(b.testDate) - new Date(a.testDate));
    
    const manageRecordsTable = document.getElementById('manage-score-records');
    manageRecordsTable.innerHTML = '';
    
    records.forEach(record => {
        // 处理缺席情况
        if (record.absent) {
            const row = document.createElement('tr');
            row.className = 'absent';
            row.innerHTML = `
                <