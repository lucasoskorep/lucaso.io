import re
import os
import requests
import fileinput


def extract_content(file_path):
    """
    Extracts the gitlab and UseReadme variables from the top of the markdown files
    """
    with open(file_path, 'r') as file:
        content = file.read()
        gitlab_pattern = re.search(r'Gitlab: (.+)', content)
        readme_pattern = re.search(r'UseReadme: (.+)', content)
        gitlab_url = gitlab_pattern.group(1) if gitlab_pattern else None
        use_readme = readme_pattern.group(1) if readme_pattern else None
    return gitlab_url, use_readme


def inject_content(file_path, content):
    """
    Insert GitLab URL content after the anchor line and save the file
    :param file_path: File to inject intent into
    :param content: Content to be injected into the file at the given anchor
    """
    #
    with fileinput.FileInput(file_path, inplace=True) as file:
        for line in file:
            print(line, end='')
            if line.strip() == '[//]: # (anchor)':
                print(content)
                return


def download_file(readme_url) -> tuple[str, int]:
    print(f"trying download from {readme_url}")
    response = requests.get(readme_url)
    if response.status_code == 200:
        readme_content = response.text
        return readme_content, response.status_code
    if response.status_code == 404:
        return None, response.status_code
    else:
        raise Exception(f"Could not download file from url: {readme_url}")


def process_file(file_path):
    print(f"processing file : {file_path}")
    gitlab_url, use_readme = extract_content(file_path)
    if use_readme and use_readme.lower() == "true" and gitlab_url:
        try:
            content, code = download_file(gitlab_url + "/-/raw/main/README.md")
            if code == 404:
                print("unable to find readme from main branch - trying master")
                content, code = download_file(gitlab_url + "/-/raw/master/README.md")
            if code == 404:
                raise Exception("readme not found for either")
            else:
                inject_content(file_path, content)
        except Exception as e:
            print("failed to download from either branch - file may not be present? ")
            print(e)
            raise e
    print(f"usereadme: {use_readme}")


def process_files_in_directory(directory):
    for filename in os.listdir(directory):
        if os.path.isfile(os.path.join(directory, filename)):
            file_path = os.path.join(directory, filename)
            process_file(file_path)


# Usage example
directory_path = './content/articles/projects'  # Replace with the path to your directory
process_files_in_directory(directory_path)
