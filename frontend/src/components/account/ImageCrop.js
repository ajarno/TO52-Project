import React from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import Grid from "@material-ui/core/Grid";

function ImageCrop({ imageSrc, setEditorRef, scaleValue, onScaleChange }) {
  return (
    <div>
      <div className="editorOverlayInner">
        <div className="editorModalContent clearfix">
          <div className="cropCnt">
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <AvatarEditor
                  image={imageSrc}
                  border={50}
                  borderRadius={150}
                  scale={scaleValue}
                  rotate={0}
                  ref={setEditorRef}
                  className="cropCanvas"
                  width={150}
                  height={150}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

ImageCrop.propTypes = {
  setEditorRef: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired,
  scaleValue: PropTypes.number.isRequired,
  onScaleChange: PropTypes.func.isRequired,
};

export default ImageCrop;
