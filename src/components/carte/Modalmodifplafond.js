import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Divider, Stack, Button } from "@mui/material";

function Modalmodifplafond({
  isOpen,
  onClose,
  handlePlafondChange,
  min,
  max,
  defaultPlafon,
}) {
  const [SliderValue, setSliderValue] = useState(defaultPlafon || min);
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="slider-modal"
      aria-describedby="slider-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw", // Responsive width
          maxWidth: "370px", // Max width of the modal
          height: "80vw",
          maxHeight: "400px",
          background: "#fff",
          padding: "16px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          border: "none !important",
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Augmentation du plafond de la carte
        </Typography>
        <div style={{ marginBottom: "16px" }}>
          <Stack direction="row">
            <Typography flexGrow={1} variant="body2" gutterBottom>
              <strong> {min} </strong>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong> {max} </strong>
            </Typography>
          </Stack>

          <Slider
            value={SliderValue}
            onChange={handleSliderChange}
            sx={{
              "& .MuiSlider-thumb": {
                color: "#f57a00",
              },
              "& .MuiSlider-track": {
                color: "#f57a00",
              },
              "& .MuiSlider-rail": {
                color: "grey",
              },
            }}
            step={10}
            min={min}
            max={max}
          />
        </div>
        <Stack direction="row">
          <Typography flexGrow={1} variant="body2" gutterBottom>
            Min
          </Typography>
          <Typography variant="body2" gutterBottom>
            Max
          </Typography>
        </Stack>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Typography>
            {" "}
            <strong>Actuel: {SliderValue}</strong>
          </Typography>
          <button
            onClick={() => {
              handlePlafondChange(SliderValue);
              onClose();
            }}
            style={{
              cursor: "pointer",
              marginTop: "8px",
              backgroundColor: "#f57a00",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
          >
            Valider les modifications
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Modalmodifplafond;
