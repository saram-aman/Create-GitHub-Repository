import { Octokit } from "https://esm.sh/@octokit/core";
    
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('repo-form');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const repoName = document.getElementById('repo-name').value;
        const pat = document.getElementById('pat').value;

        const octokit = new Octokit({
            auth: pat
        });

        try {
            const response = await octokit.request('POST /user/repos', {
                name: repoName,
                description: 'This is a new repository created using the GitHub API',
                private: false
            });

            // Display response JSON
            document.getElementById('response').innerHTML = '<pre>' + JSON.stringify(response.data, null, 2) + '</pre>';

            // Display creation message
            document.getElementById('message').textContent = 'Repository created successfully!';
            document.getElementById('message').classList.remove('error');

        } catch (error) {
            console.error('Error creating repository:', error);

            // Display error message
            document.getElementById('message').textContent = 'An error occurred while creating the repository. Please try again.';
            document.getElementById('message').classList.add('error');
        }
    });
});