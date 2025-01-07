const copyToClipboard = (
    textToCopy: string,
    openNotificationFunc: (title: string, description: string) => void
) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Use the Clipboard API
        navigator.clipboard.writeText(textToCopy).then(
            () => {
                openNotificationFunc("", "Text has been copied to your clipboard!");
            },
            (err) => {
                console.error("Failed to copy text: ", err.message);
                openNotificationFunc("Error", "Failed to copy text to clipboard.");
            }
        );
    } else {
        // Fallback to `document.execCommand`
        const fallbackCopyToClipboard = (text: string) => {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed"; // Prevent scrolling to the bottom
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            try {
                const successful = document.execCommand("copy");
                if (successful) {
                    openNotificationFunc("", "Text has been copied to your clipboard!");
                } else {
                    openNotificationFunc("Error", "Failed to copy text to clipboard.");
                }
            } catch (err) {
                console.error("Fallback: Failed to copy text: ");
                openNotificationFunc("Error", "Fallback failed to copy text to clipboard.");
            }

            document.body.removeChild(textarea);
        };

        fallbackCopyToClipboard(textToCopy);
    }
};

export default copyToClipboard;
