# ===============================
# Configuration
# ===============================

SAMPLE_SIZE = 1000
BATCH_SIZE = 16
LEARNING_RATE = 0.001
EPOCHS = 2
MODEL_PATH = "ml/checkpoints/cnn_model.pth"

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader

from ml.datasets.scripts.dataset_loader import DatasetLoader
from ml.models.audio_dataset import AudioDataset
from ml.models.cnn_model import CNNModel

from sklearn.model_selection import train_test_split


def train():

    # Load dataset
    loader = DatasetLoader()
    df = loader.prepare_train_dataset()
    
    # Train on a small subset for testing
    df = df.sample(n=SAMPLE_SIZE, random_state=42).reset_index(drop=True)

    # Split into train and validation 
    train_df,val_df = train_test_split(
        df,
        test_size=0.2,
        random_state=42,
        stratify=df["label"] # Keeps class distribution balanced     
        )
    
    train_dataset = AudioDataset(train_df)
    val_dataset = AudioDataset(val_df)

    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=0
    )
    
    val_loader = DataLoader(
        val_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False
    )

    print(f"Training Samples   : {len(train_df)}")
    print(f"Validation Samples : {len(val_df)}")
    
    # Device
    device = torch.device(
        "cuda" if torch.cuda.is_available() else "cpu"
    )

    print(f"Using device: {device}")

    # Model
    model = CNNModel().to(device)

    # Loss
    criterion = nn.CrossEntropyLoss()

    # Optimizer
    optimizer = optim.Adam(
        model.parameters(),
        lr=LEARNING_RATE
    )

    epochs = EPOCHS
    best_val_acc = 0.0

    for epoch in range(epochs):

        model.train()

        running_loss = 0.0
        correct = 0
        total = 0 

        for inputs, labels in train_loader:

            inputs = inputs.to(device)
            labels = labels.to(device)

            optimizer.zero_grad()

            outputs = model(inputs)

            loss = criterion(outputs, labels)

            loss.backward()

            optimizer.step()

            running_loss += loss.item()

            # Calculate training accuracy
            _, predicted = torch.max(outputs, 1)

            total += labels.size(0)
            correct += (predicted == labels).sum().item()
        
        epoch_loss = running_loss / len(train_loader)
        epoch_acc = 100 * correct / total
        
        print(
            f"Epoch {epoch+1}/{epochs} \n\n"
            f"Train Loss: {epoch_loss:.4f} \n"
            f"Train Acc: {epoch_acc:.2f}%\n\n"
        )

        # ---------------- Validation ---------------- #

        model.eval()

        val_loss = 0.0
        val_correct = 0
        val_total = 0

        with torch.no_grad():

            for inputs, labels in val_loader:

                inputs = inputs.to(device)
                labels = labels.to(device)

                outputs = model(inputs)

                loss = criterion(outputs, labels)

                val_loss += loss.item()

                _, predicted = torch.max(outputs, 1)

                val_total += labels.size(0)
                val_correct += (predicted == labels).sum().item()

            avg_val_loss = val_loss / len(val_loader)
            val_acc = 100 * val_correct / val_total

            print(
                f"Validation Loss: {avg_val_loss:.4f} \n"
                f"Validation Acc: {val_acc:.2f}% \n"
            )

            
    
            if val_acc > best_val_acc:
                best_val_acc = val_acc
                       
                torch.save(
                    model.state_dict(),
                    MODEL_PATH
                )

                print(f"Best Model saved.... Validation Accuracy: {val_acc:.2f}%")
            
            print("-" * 50)
                    
    print("Training Complete!")
    

if __name__ == "__main__":
    train()