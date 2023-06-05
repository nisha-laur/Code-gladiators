// First button that shows on page //
$('#next1').click(function() {
    // Sets income as the value input by user //
    let income = $('#income').val();
    // Checks for empty field //
    if (income === '') {
      alert('Please enter a value.');
    // Checks for negative numbers //
    } else if (income <= 0){
      alert('Please enter a value.');
    } else {
    // If positive integer is entered, hides opening div and shows next div //
      $('.opening').hide();
      $('.expenses').show();
    }
  });
  
  // Second button to capture expenses //
  $('#next2').click(function() {
    let expenses = $('.exp').val();
    // Checks for negative numbers //
    if (expenses < 0) {
      alert('Please enter a positive number.');
    // If no negative numbers are there, continues on //
    } else {
     // Hides expenses div and shows end div //
      $('.expenses').hide();
      $('.end').show();
      
      // Captures income //
      let income = $("#income").val();
      // Captures value of each expense as entered by user //
      let expenseRent = $("#expenseRent").val();
      let expensePower = $("#expensePower").val();
      let expenseWater = $("#expenseWater").val();
      let expenseCable = $("#expenseCable").val();
      let expensePhone = $("#expensePhone").val();
      let expenseInsurance = $("#expenseInsurance").val();
      let expenseGym = $("#expenseGym").val();
      let expenseGroceries = $("#expenseGroceries").val();
      let expenseCar = $("#expenseCar").val();
      let expenseGas = $("#expenseGas").val();
      let expenseFood = $("#expenseFood").val();
      let expenseEntertainment = $("#expenseEntertainment").val();
      let expenseOther = $("#expenseOther").val();
      let expenseOther2 = $("#expenseOther2").val();  
      
      // Empty array for the total //
      let total = [];
      // Pushes each expense to the array - parseInt makes each val an integer //
      total.push(parseInt(expenseRent), parseInt(expensePower), parseInt(expenseWater), parseInt(expenseCable), parseInt(expensePhone), parseInt(expenseInsurance), parseInt(expenseGym), parseInt(expenseGroceries), parseInt(expenseCar), parseInt(expenseGas), parseInt(expenseFood), parseInt(expenseEntertainment), parseInt(expenseOther), parseInt(expenseOther2));
      
      // Filters array and removes any NaN values that were left blank by user //
      const totalFiltered = total.filter(function (value) {
      return !Number.isNaN(value);
  });
     
      // Adds up the array to find the total amount for expenses //
      var sum = totalFiltered.reduce(function(a, b) { 
        return a + b; 
      }, 0);
      
      // Leftovers is the income minus the total of expenses //
      let leftovers = income - sum;
      // If the leftover amount is zero //
      if (leftovers === 0) {
        $('.totals').html('You make $' + income + ' a month, and you are spending $' + sum + ' a month on bills. This leaves you with 0 leftover, but no defecit. You are doing okay!');
      // If the leftover amount isn't zero but is more than zero //
      } else if (leftovers > 0) {
     $('.totals').html('You make $' + income + ' a month, and you are spending $' + sum + ' a month on bills. This leaves you with a leftover amount of $' + leftovers + '! Great job! Maybe it\'s time to invest?');
      // If the leftover amount is negative //
      } else {
        $('.totals').html('You make $' + income + ' a month, and you are spending $' + sum + ' a month on bills. This leaves you with a defecit  of $' + leftovers + '! Uh oh. Sorry to hear that!');
      }
    
      // Calculates percentage of income for each expense //
      let rentPer = expenseRent/income * 100;
      let powerPer = expensePower/income * 100;
      let waterPer = expenseWater/income * 100;
      let cablePer = expenseCable/income * 100;
      let phonePer = expensePhone/income * 100;
      let insurancePer = expenseInsurance/income * 100;
      let gymPer = expenseGym/income * 100;
      let groceriesPer = expenseGroceries/income * 100;
      let carPer = expenseCar/income * 100;
      let gasPer = expenseGas/income * 100;
      let foodPer = expenseFood/income * 100;
      let entertainmentPer = expenseEntertainment/income * 100;
      let otherPer = expenseOther/income * 100;
      let other2Per = expenseOther2/income * 100;
      
      // Alerts user of each expense and what percentage of their income that is //
      $('.breakdown').html
      ('You spend $' + expenseRent + ' on Rent monthly, which is ' + Math.round(rentPer * 100) / 100 + '% of your income.<br>' +
      'You spend $' + expensePower + ' on Power monthly, which is ' + Math.round(powerPer* 100) / 100 + '% of your income.<br>' +
      'You spend $' + expenseWater + ' on Water monthly, which is ' + Math.round(waterPer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseCable + ' on Cable monthly, which is ' + Math.round(cablePer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expensePhone + ' on Phone monthly, which is ' + Math.round(phonePer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseInsurance + ' on Insurance monthly, which is ' + Math.round(insurancePer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseGym + ' on Gym monthly, which is ' + Math.round(gymPer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseGroceries+ ' on Groceries monthly, which is ' + Math.round(groceriesPer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseCar + ' on Car monthly, which is ' + Math.round(carPer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseGas + ' on Gas monthly, which is ' + Math.round(gasPer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseFood + ' on Food monthly, which is ' + Math.round(foodPer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseEntertainment + ' on Entertainment monthly, which is ' + Math.round(entertainmentPer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseOther + ' on Other monthly, which is ' + Math.round(otherPer* 100) / 100 + '% of your income.<br>' +
       'You spend $' + expenseOther2 + ' on Other monthly, which is ' + Math.round(other2Per* 100) / 100 + '% of your income.<br>' 
      );               
    }
  });
  
  
  