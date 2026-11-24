async function read() {
    try {
        let response = await fetch('/seminar_list/content.txt?v=20261124', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to load seminar list: ' + response.status);
        let fileContent = await response.text();

        // if (fileContent == undefined) {
        //     response = await fetch('/seminar_list/content.txt?v=20261124', { cache: 'no-store' });
        //     fileContent = await response.text();
        // }

        const parser = new DOMParser();
        const doc = parser.parseFromString(fileContent, 'text/html');
        return doc.body.innerHTML;
    } catch (error) {
        console.error(error);
    }
}