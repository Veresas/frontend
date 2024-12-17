import React from "react";
import Video from "../../utils/Video";
import { useParams } from "react-router-dom";

export const FilmPage = () => {
	const { id } = useParams();
	return (
		<div>
			<Video id={id} />
		</div>
	);
};
