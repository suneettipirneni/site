/**
 * Calculates the amount of minutes needed to read a document.
 *
 * Sourced from: https://jonas-rodehorst.dev/posts/calculate-estimated-reading-time-with-contentlayer
 *
 * @param text The contents of the post
 * @returns The amount of minutes needed to read the document.
 */
export function calculateReadingTime(text: string) {
	const wordsPerMinute = 200;
	const noOfWords = text.split(/\s/g).length;
	const minutes = noOfWords / wordsPerMinute;
	const readTime = Math.ceil(minutes);

	return readTime;
}
