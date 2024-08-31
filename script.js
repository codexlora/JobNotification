//Wait for JavaScript executions
setTimeout(queryJobs, 5000);

//Query the job results
async function queryJobs() {
	let jobs = document.querySelectorAll('article.job-tile:not(.visited)');
	for (const job of jobs) {
		
		let jobTitle = job.querySelector('h2.job-tile-title > a').textContent;
		let jobDescription = job.querySelector('.text-body-sm').textContent;

		const options = {
			body: jobDescription,
		};

		await newNotification(jobTitle, options);
		job.click();
		console.log(jobTitle + ' notification created');
	}

	await avoidBan();
}

//Wait and notify the job
async function newNotification(jobTitle, options) {
	await new Promise((resolve) => {
		setTimeout(function () {
			const notification = new Notification(jobTitle, options);
			resolve(); // Resolviendo la promesa después de la notificación
		}, 10000);
	});
}

//Timmer to avoid a ban
async function avoidBan() {
	await new Promise((resolve) => {
		setTimeout(function () {
			window.location.reload();
			resolve(); // Resolviendo la promesa después de que no queden jobs por notificar
		}, 100000);
	});
}
