var ctx = document.getElementById('mychart').getContext('2d');
var earning = document.getElementById('earning').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['Today-Call', 'Agent-Active', 'Agent-on-call', 'Active-Agent'],
        datasets: [{
            labels: '# of Counts',
            data: [1200, 900, 700, 1000],
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                
            ],
    
        }]
    },
    options: {
        responsive: true,
    }
});



var myChart= new Chart(earning, {
    type: 'bar',
    data: {
        labels: ['Today-call', 'Active-Agent', 'Avtive-on-call', 'On-Hold', 'Free-Agent'],
        datasets: [{
            data: [12, 19, 13, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                responsive: true,
            }
        }
    }
});