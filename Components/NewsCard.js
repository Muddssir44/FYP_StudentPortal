// FilterBar Component
import React from 'react';
import {
    View,
    Text,

    TouchableOpacity,

} from 'react-native';

import {

    Tag,
    ChevronRight,

    Clock
} from 'lucide-react-native';
import { styles } from '../Screens/StudentNewsScreen';
import FadeInView2 from './FadeInView2';


const CategoryBadge = ({ category }) => {
    const getBadgeColor = () => {
        switch (category.toLowerCase()) {
            case 'announcement':
                return styles.announcementBadge;
            case 'alert':
                return styles.alertBadge;
            default:
                return styles.defaultBadge;
        }
    };

    return (
        <View style={[styles.categoryBadge, getBadgeColor()]}>
            <Text style={styles.categoryText}>{category}</Text>
        </View>
    );
};

const NewsCard = ({ item, onPress, index }) => {
    return (
        <FadeInView2 delay={index * 100}>
            <TouchableOpacity
                onPress={() => onPress(item)}
                style={styles.newsCard}
                activeOpacity={0.7}
            >
                <View style={styles.newsCardHeader}>
                    <CategoryBadge category={item.category} />
                    <View style={styles.dateContainer}>
                        <Clock size={14} color="#666" style={{ marginRight: 4 }} />
                        <Text style={styles.dateText}>
                            {new Date(item.publishDate).toLocaleDateString()}
                        </Text>
                    </View>
                </View>

                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsContent} numberOfLines={3}>
                    {item.content}
                </Text>

                <View style={styles.tagsContainer}>
                    {item.tags.map((tag, index) => (
                        <View key={index} style={styles.tagChip}>
                            <Tag size={12} color="#666" style={{ marginRight: 4 }} />
                            <Text style={styles.tagText}>#{tag}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.newsCardFooter}>
                    <View style={styles.authorContainer}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.authorInitials}>
                                {item.author.split(' ').map(n => n[0]).join('')}
                            </Text>
                        </View>
                        <Text style={styles.authorText}>
                            {item.author}
                        </Text>
                    </View>
                    <ChevronRight size={20} color="#2196F3" />
                </View>
            </TouchableOpacity>
        </FadeInView2>
    );
};
export default NewsCard;