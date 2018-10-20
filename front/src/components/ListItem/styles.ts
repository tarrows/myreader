import styled from 'styled-components';

export const Item = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.text};
`;

export const Host = styled.span`
  color: ${({ theme }) => theme.textSecondary};
`;

export const ExternalLink = styled.a`
  color: ${({ theme }) => theme.text};
`;

export const Description = styled.div`
  color: ${({ theme }) => theme.textSecondary};
`;

export const CommentLink = styled.a`
  color: ${({ theme }) => theme.textSecondary};
`;
