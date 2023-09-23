import React from "react";
import { View, TouchableOpacity, Text, StyleSheet,Image } from "react-native";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate the range of page numbers to display (e.g., [1, 2, 3, 4, 5])
  const pageRange = Array.from(
    { length: Math.min(4, totalPages) },
    (_, i) => currentPage - 3 + i
  ).filter((page) => page > 0 && page <= totalPages);

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
        <Image source={require('../images/left_arrow.png')}
                                style={{ width: 25, height:25, }} />
        {/* <Text style={styles.paginationText}>Previous</Text> */}
      </TouchableOpacity>
      {pageRange.map((page) => (
        <TouchableOpacity
          key={page}
          style={[
            styles.paginationButton,
            currentPage === page ? styles.activePageButton : null,
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
      <TouchableOpacity
        style={styles.paginationButton}
        onPress={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        {/* <Text style={styles.paginationText}>Next</Text> */}
        <Image source={require('../images/right-arrow.png')}
                                style={{ width: 25, height:25, }} />
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
    backgroundColor:"#ffad001a"
  },
  paginationButton: {
    backgroundColor: "#c27b7f",
    padding: 10,
    borderRadius: 5,
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
});

export default Pagination;
