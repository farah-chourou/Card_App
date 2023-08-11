import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import carteservice from "../../services/cartes.service";
import comptesservice from "../../services/comptes.service";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Divider, Stack, Typography } from "@mui/material";
import cardimg from "../../images/cardimg.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Modalmodifplafond from "./Modalmodifplafond";
import { Link } from "@mui/material";

const styles = {
  container: {
    width: "50%",
    margin: 1,
    aspectRatio: "16 / 9",
    background: `url(${cardimg}) center/cover no-repeat`,
    backgroundSize: "100% 100%",
    color: "white",
    "@media (max-width: 960px)": {
      width: "80%",
    },
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
};

const AppContainer = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  width: "100%", // Utilisation de toute la largeur disponible
  maxWidth: "100%",
  boxSizing: "border-box",
  backgroundColor: "#f5f5f5", // Inclure les bordures et les rembourrages dans la largeur totale
});

const TitleAndButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center", // Aligner les éléments verticalement
  width: "100%",
  marginBottom: "10px",
  color: "#606060", // Couleur de texte pour le titre en gris foncé
});

const ButtonStyled = styled(Button)({
  backgroundColor: "#f57a00", // Couleur d'arrière-plan pour le bouton en orange
  color: "#fff", // Couleur de texte pour le bouton en blanc
});

const OptionsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Centrer les options horizontalement
  width: "100%",
  marginTop: "20px", // Ajouter un espace en haut des options
});

const SelectStyled = styled(Select)({
  marginBottom: "10px", // Ajouter une marge basse entre les options
});

function Carte() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [switchChecked, setSwitchChecked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plafondheb, setPlafondheb] = useState("");
  const sliderMinValue = 400;

  const handlePlafondChange = (newValue) => {
    setPlafondheb(newValue);
    console.log(newValue);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handletypeCardChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleCardChange = (e) => {
    setSelectedCard(e.target.value);
  };

  useEffect(() => {
    const fetchedAccounts = comptesservice.getAccounts();
    setAccounts(fetchedAccounts);
  }, []);

  useEffect(() => {
    function fetchCardsByAccountId() {
      if (selectedAccount) {
        console.log("selected account=", selectedAccount);
        const fetchedCards = carteservice.getCardsByAccountId(selectedAccount);
        setCards(fetchedCards);
      } else {
        setCards([]);
      }
    }
    fetchCardsByAccountId();
  }, [selectedAccount, selectedCard]);
  useEffect(() => {
    setSelectedCard("");
    setSelectedType("");
  }, [selectedAccount]);

  return (
    <div>
      <AppContainer>
        <TitleAndButtonContainer>
          <h2 style={{ textAlign: "left", margin: 0 }}>Mes cartes</h2>
          <ButtonStyled variant="contained">Ajouter une carte</ButtonStyled>
        </TitleAndButtonContainer>

        <OptionsContainer>
          <FormControl fullWidth>
            <SelectStyled
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Sélectionnez un compte
              </MenuItem>
              {accounts &&
                accounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    Compte {account.id}
                  </MenuItem>
                ))}
            </SelectStyled>
          </FormControl>
          <FormControl fullWidth>
            <SelectStyled
              disabled={!selectedAccount}
              value={selectedCard}
              onChange={handleCardChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Sélectionnez une carte
              </MenuItem>
              {cards.map((card) => (
                <MenuItem key={card.id} value={card}>
                  Carte N° {card.cardNumber}
                </MenuItem>
              ))}
            </SelectStyled>
          </FormControl>
          <FormControl fullWidth>
            <SelectStyled
              disabled={!selectedAccount}
              value={selectedType}
              onChange={handletypeCardChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Sélectionnez le type
              </MenuItem>
              {cards.map((card) => (
                <MenuItem key={card.id} value={card.type}>
                  Carte {card.type}
                </MenuItem>
              ))}
            </SelectStyled>
          </FormControl>
        </OptionsContainer>

        {selectedCard && (
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              minHeight: "300px",
            }}
          >
            <CardContent width="100%">
              <Stack m={2}>
                <Typography variant="h5">
                  {" "}
                  <strong>{selectedType && selectedType} </strong>
                </Typography>
              </Stack>{" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {" "}
                <Stack direction="column" sx={styles.container}>
                  <Box sx={{ marginTop: "20%", marginLeft: "8%" }}>
                    <h1>{selectedCard?.cardNumber}</h1>
                    <h3>{selectedCard?.accountName}</h3>
                    <p>
                      {selectedCard?.expiryDate ? "Expiration date" : ""}{" "}
                      {selectedCard?.expiryDate}
                    </p>
                  </Box>
                </Stack>
              </div>
              <center>
                <Stack
                  justifyContent="center"
                  mt={1}
                  sx={{
                    marginLeft: "40%",
                    "@media (max-width: 600px)": {
                      marginLeft: "50%",
                    },
                  }}
                >
                  <Link color="textSecondary"> Code pin oublie ?</Link>
                </Stack>{" "}
              </center>{" "}
              <center>
                <Stack justifyContent="center" mt={2}>
                  <FormControlLabel
                    sx={{
                      display: "block",
                    }}
                    control={
                      <Switch
                        checked={switchChecked}
                        name="loading"
                        color="success"
                        onChange={() => setSwitchChecked(!switchChecked)}
                      />
                    }
                    label={switchChecked ? "Carte active" : "Carte désactivée"}
                  />
                </Stack>{" "}
              </center>
              <Stack direction="row">
                <Box flexGrow={1}>
                  {" "}
                  <h5> Statut</h5>
                </Box>
                <Box>
                  <h5
                    style={{
                      color:
                        selectedCard?.status === "Active"
                          ? "green"
                          : selectedCard?.status === "En route"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {selectedCard?.status}
                  </h5>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row">
                <Box flexGrow={1}>
                  {" "}
                  <h5> Date Expiration</h5>
                </Box>
                <Box>
                  <h5>{selectedCard?.expiryDate}</h5>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row">
                <Box flexGrow={1}>
                  {" "}
                  <h5>Plafond Disponible</h5>
                </Box>
                <Box>
                  <h5>{selectedCard?.cardAvailableLimit}</h5>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" alignItems="center">
                <Box flexGrow={1}>
                  {" "}
                  <h5> Plafond hebdomadaire</h5>
                </Box>
                <Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton
                      aria-label="edit"
                      onClick={handleOpenModal}
                      disabled={
                        !switchChecked ||
                        new Date(
                          selectedCard?.expiryDate?.substring(6, 10),
                          selectedCard?.expiryDate?.substring(3, 5) - 1,
                          selectedCard?.expiryDate?.substring(0, 2)
                        ) < new Date()
                      }
                    >
                      <BorderColorIcon
                        style={{
                          color:
                            !switchChecked ||
                            new Date(
                              selectedCard?.expiryDate?.substring(6, 10),
                              selectedCard?.expiryDate?.substring(3, 5) - 1,
                              selectedCard?.expiryDate?.substring(0, 2)
                            ) < new Date()
                              ? "gray"
                              : "#f57a00",
                        }}
                      />
                    </IconButton>

                    <h5>{plafondheb ? plafondheb : selectedCard?.cardLimit}</h5>
                  </Stack>
                </Box>
              </Stack>
              <Divider />
            </CardContent>
          </Card>
        )}
      </AppContainer>
      {selectedCard && (
        <Modalmodifplafond
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          defaultPlafon={selectedCard?.cardLimit}
          min={sliderMinValue}
          max={selectedCard?.cardAvailableLimit}
          handlePlafondChange={handlePlafondChange}
        />
      )}
    </div>
  );
}

export default Carte;
