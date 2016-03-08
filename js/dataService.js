app.service('dataService',function() {

	var jobs = [
		{
			id: '0',
			name: 'Smith',
			style: 'Alder & Paint',
			images: [
				{
					url: './images/smith1.jpg',
					order: 1
				},
				{
					url: './images/smith2.jpg',
					order: 2
				},
				{
					url: './images/smith3.jpg',
					order: 3
				},
				{
					url: './images/smith4.jpg',
					order: 4
				},
				{
					url: './images/smith5.jpg',
					order: 5
				}
			]
		},
		{
			id: '1',
			name: 'Johnson',
			style: 'Cherry',
			images: [
				{
					url: './images/johnson1.jpg',
					order: 1
				},
				{
					url: './images/johnson2.jpg',
					order: 2
				},
				{
					url: './images/johnson3.jpg',
					order: 3
				},
				{
					url: './images/johnson4.jpg',
					order: 4
				},
				{
					url: './images/johnson5.jpg',
					order: 5
				}
			]
		},
		{
			id: '2',
			name: 'Castleton',
			style: 'Maple',
			images: [
				{
					url: './images/castleton1.jpg',
					order: 1
				},
				{
					url: './images/castleton2.jpg',
					order: 2
				},
				{
					url: './images/castleton3.jpg',
					order: 3
				},
				{
					url: './images/castleton4.jpg',
					order: 4
				},
				{
					url: './images/castleton5.jpg',
					order: 5
				}
			]
		}
	];
	var jobsMenu = [
		{
			jobType: 'Kitchens',
			jobs: [
				'Smith',
				'Johnson',
				'Castleton',
				'Hughes',
				'Watson',
				'Markham',
				'Morgan'
			]
		},
		{
			jobType: 'Bathrooms',
			jobs: [
				'Smith1',
				'Johnson1',
				'Castleton1'
			]
		},
		{
			jobType: 'Home Offices',
			jobs: [
				'Smith2',
				'Johnson2',
				'Castleton2'
			]
		},
		{
			jobType: 'Entertainment Centers',
			jobs: [
				'Smith3',
				'Johnson3',
				'Castleton3'
			]
		}
	]

	this.getJobsMenu = function() {
		return jobsMenu;
	}

	this.test = "Hello World!";
});