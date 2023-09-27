import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from "react-native";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate the range of page numbers to display (e.g., [1, 2, 3, 4, 5])
  const pageRange = Array.from(
    { length: Math.min(totalPages, totalPages) },
    (_, i) => i + 1
  );

  
  
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={styles.paginationButton}
        onPress={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <Image source={require('../images/left_arrow.png')} style={{ width: 25, height: 25, }} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pageNumbersContainer}
      >
        {pageRange.map((page, index) => (
          <TouchableOpacity
            key={page}
            style={[
              styles.paginationButton,
              currentPage === page ? styles.activePageButton : null,
              index < pageRange.length - 1 ? { marginRight: 15 } : null, // Add margin to all except the last one
            ]}
            onPress={() => onPageChange(page)}
          >
            <Text
              style={[
                styles.paginationText,
                currentPage === page ? styles.activePageText : null,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.paginationButton}
        onPress={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        <Image source={require('../images/right-arrow.png')} style={{ width: 25, height: 25 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffad001a",
  },
  paginationButton: {
    backgroundColor: "#c27b7f",
    padding: 10,
    borderRadius: 5,
    marginRight:10
  },
  paginationText: {
    color: "#fff",
    fontWeight: "bold",
  },
  activePageButton: {
    backgroundColor: "#000", // Change to your active page button color
  },
  activePageText: {
    color: "#fff", // Change to your active page text color
  },
  pageNumbersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Pagination;



