var tableData = {},
	 incomeArray = [],
	 expenseArray = [],
	 initData = {
		 datasets: [{
			 data: [100],
			 backgroundColor: [
				 "#dddddd"
			 ],
		 }],
		 labels: [
			 'Spending'
		 ]
	 },
	 expenseGraph = document.getElementById("expenseGraph").getContext("2d"),
	 expenseDonutChart = new Chart(expenseGraph, {
		 type: 'doughnut',
		 data: initData
	 }),
	 expenseColors = {
		 "Food": "#dce775",
		 "Loan": "#81c784",
		 "Rent": "#ffb74d",
		 "Retail Non-Food": "#ff8a65",
		 "Insurance": "#a1887f",
		 "Subscriptions": "#90a4ae",
		 "Healthcare": "#0097a7",
		 "Utilities": "#9575cd"
	 };

$('.modal').modal();

$("#expenseCat").change(function(){
	var currentVal = $(this).val(),
		 expensesSub = $("#expenseSubCat"),
		 expenseSubOptions = $("#expenseSubCat option");
	
	expensesSub.val("");
	
	expenseSubOptions.each(function(){
		$(this).show();
		if ($(this).data("cat") != currentVal) {
			$(this).hide();
		}
	});
	
	expensesSub.prop("disabled", false);
});

$(".income-form").submit(function(e){
	e.preventDefault();
	
	var currentIncObj = {},
		 imcomeTotal = 0;
	
	currentIncObj["category"] = $(this).find("select").find(":selected").text();
	currentIncObj["amount"] = $("#amount").val();
	currentIncObj["description"] = $("#description").val();
	currentIncObj["id"] = Math.floor((Math.random() * 50000) + 10000);
	
	incomeArray.push(currentIncObj);
	tableData["income"] = incomeArray;
	
	updateBudgetTable(tableData);
	swal({
		title: "Success!",
		html: "<input type='text' value='ben'>",
		button: false,
		text: "Income Added.",
		icon: "success",
		timer: 600
	});
	$(this)[0].reset();
});

$(".expense-form").submit(function(e){
	e.preventDefault();
	
	var currentExpObj = {},
		 expenseTotal = 0;
	
	currentExpObj["category"] = $("#expenseCat").find(":selected").text();
	currentExpObj["subCategory"] = $("#expenseSubCat").find(":selected").text();
	currentExpObj["amount"] = $("#paymentAmount").val();
	currentExpObj["description"] = $("#paymentDescription").val();
	currentExpObj["id"] = Math.floor((Math.random() * 50000) + 10000);
	
	expenseArray.push(currentExpObj);
	tableData["expense"] = expenseArray;
	
	updateBudgetTable(tableData);
	swal({
		title: "Success!",
		button: false,
		text: "Expense Added.",
		icon: "success",
		timer: 600
	});
	$(this)[0].reset();
});

function updateBudgetTable(data) {
	
	var table = $(".budget-table tbody"),
		 incomeHtml = "",
		 expenseHtml = "",
		 expenseTotal = 0,
		 incomeTotal = 0,
		 totalHtml = "",
		 totalSign = "+",
		 expenseObj = {},
		 expenseCatList = [];
	
	if (data.income) {
		for (var i = 0; i < data.income.length; i++) {
			incomeTotal += Number(data.income[i].amount); 
			incomeHtml += "<tr data-id='" + data.income[i].id + "' data-row-type='income'>" +
				"<td class='budget-plus'>+</td>" +
				"<td>" + data.income[i].category + "</td>" +
				"<td></td>" +
				"<td>" + data.income[i].description + "</td>" +
				"<td>₹" + data.income[i].amount + "</td>" +
				"<td class='remove-row'><a href='#'><i class='material-icons right'>clear</i></a></td>" +
			"</tr>";
		}
	}
	
	if (data.expense) {
		for (var i = 0; i < data.expense.length; i++) {
			expenseTotal += Number(data.expense[i].amount);
			
			if (expenseObj[data.expense[i].category]) {
				expenseObj[data.expense[i].category] += Number(data.expense[i].amount);
			} else {
				expenseObj[data.expense[i].category] = Number(data.expense[i].amount);
			}
			
			if (expenseCatList.indexOf(data.expense[i].category) === -1) {
				 expenseCatList.push(data.expense[i].category);
			}
			
			expenseHtml += "<tr data-id='" + data.expense[i].id + "' data-row-type='expense'>" +
				"<td class='budget-minus'>-</td>" +
				"<td>" + data.expense[i].category + "</td>" +
				"<td>" + data.expense[i].subCategory + "</td>" +
				"<td>" + data.expense[i].description + "</td>" +
				"<td>₹" + data.expense[i].amount + "</td>" +
				"<td class='remove-row'><a href='#'><i class='material-icons right'>clear</i></a></td>" +
			"</tr>";
		}
	}
	
	var total = incomeTotal - expenseTotal;
	totalHtml = "<tr>" +
		"<td></td>" +
		"<td></td>" +
		"<td></td>" +
		"<td></td>" +
		"<td><strong>Total:₹" + total + "</strong></td>" +
	"</tr>";
	table.html(incomeHtml + expenseHtml + totalHtml);
	
	console.log(expenseObj)
	console.log(expenseCatList)
	if (expenseCatList.length != 0) {
		console.log("ben here")
		updateGraph(expenseObj, expenseCatList, expenseColors);
	}
	
}

$(document).on("click", ".remove-row", function(e){
	e.preventDefault();
	
	var parentTr = $(this).closest("tr"),
		 idToRemove = parentTr.data("id"),
		 type = parentTr.data("row-type"),
		 idIndex,
		 array;
	
	if (tableData.income) {
		for (var i = 0; i < tableData.income.length; i++) {
			if (tableData.income[i].id == idToRemove) {
				idIndex = i;
				array = "income";
				break;
			}
		}
	}
	
	if (tableData.expense) {
		for (var i = 0; i < tableData.expense.length; i++) {
			if (tableData.expense[i].id == idToRemove) {
				idIndex = i;
				array = "expense";
				break;
			}
		}
	}
	
	console.log(idIndex)
	console.log(array)
	tableData[array].splice(idIndex, 1);
	
	updateBudgetTable(tableData);
});

function updateGraph(obj, arr, colorObj) {
	var colors = [],
		 values = [],
		 labels = [];
	
	for (var i = 0; i < arr.length; i++) {
		colors.push(colorObj[arr[i]]);
		values.push(obj[arr[i]]);
		labels.push(arr[i]);
	}
	
	console.log(colors)
	console.log(values)
	console.log(labels)
	
	expenseDonutChart.data.datasets[0].data = values;
	expenseDonutChart.data.datasets[0].backgroundColor = colors;
	expenseDonutChart.data.labels = labels;
	
	expenseDonutChart.update();
}